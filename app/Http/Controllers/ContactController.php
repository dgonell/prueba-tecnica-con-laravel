<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacts/Index', [
            'contactos' => Contact::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string|max:20',
            'provincia' => 'nullable|string|max:255',
            'ciudad' => 'nullable|string|max:255',
        ]);

        Contact::create($request->all());

        return redirect()->route('contactos.index')->with('success', 'Contacto creado');
    }

    public function edit(Contact $contacto)
    {
            return Inertia::render('Contacts/Edit', [
                'contacto' => $contacto
            ]);
    }

    public function update(Request $request, Contact $contacto)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string|max:20',
            'provincia' => 'nullable|string|max:255',
            'ciudad' => 'nullable|string|max:255',
        ]);

        $contacto->update($request->all());

        return redirect()->route('contactos.index')->with('success', 'Contacto actualizado');
    }

    public function destroy(Contact $contacto)
    {
        $contacto->delete();
        return redirect()->route('contactos.index')->with('success', 'Contacto eliminado');
    }

    public function report(Request $request)
    {
        $query = Contact::query();

        if ($request->filled('nombre')) {
            $query->where('nombre', 'like', '%' . $request->nombre . '%');
        }

        if ($request->filled('provincia')) {
            $query->where('provincia', 'like', '%' . $request->provincia . '%');
        }

        if ($request->filled('ciudad')) {
            $query->where('ciudad', 'like', '%' . $request->ciudad . '%');
        }

        if ($request->filled('desde') && $request->filled('hasta')) {
            $query->whereBetween('created_at', [$request->desde, $request->hasta]);
        }

        return Inertia::render('Contacts/Report', [
            'contactos' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['nombre', 'provincia', 'ciudad', 'desde', 'hasta']),
        ]);
    }

    public function importar(Request $request)
    {
        try {
            $request->validate([
                'archivo' => 'required|file|mimes:xlsx,xls,csv,txt',
            ]);

            $archivo = $request->file('archivo');
            $spreadsheet = IOFactory::load($archivo->getPathname());
            $hoja = $spreadsheet->getActiveSheet();
            $filas = $hoja->toArray(null, true, true, true);

            $encabezados = array_map('strtolower', $filas[1]); 
            unset($filas[1]); 

            $errores = [];
            $registros = [];

            foreach ($filas as $index => $fila) {
                $row = array_combine($encabezados, array_values($fila));

                $validador = Validator::make($row, [
                    'nombre' => 'required|string|max:255',
                    'email' => 'nullable|email',
                    'telefono' => 'nullable|string',
                    'provincia' => 'nullable|string',
                    'ciudad' => 'nullable|string',
                ]);

                if ($validador->fails()) {
                    $errores[] = "Fila $index: " . implode(", ", $validador->errors()->all());
                    continue;
                }

                $registros[] = [
                    'nombre' => $row['nombre'],
                    'email' => $row['email'],
                    'telefono' => $row['telefono'],
                    'provincia' => $row['provincia'],
                    'ciudad' => $row['ciudad'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if (count($registros)) {
                Contact::insert($registros);
            }

            return response()->json([
                'success' => true,
                'mensaje' => '📥 Contactos importados correctamente.',
                'errores_csv' => $errores
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Error inesperado: ' . $e->getMessage()
            ], 500);
        }
    }

    public function exportExcel()
    {
        $contactos = Contact::all();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'Nombre');
        $sheet->setCellValue('B1', 'Email');
        $sheet->setCellValue('C1', 'Teléfono');
        $sheet->setCellValue('D1', 'Provincia');
        $sheet->setCellValue('E1', 'Ciudad');

        foreach ($contactos as $index => $contacto) {
            $fila = $index + 2;
            $sheet->setCellValue("A{$fila}", $contacto->nombre);
            $sheet->setCellValue("B{$fila}", $contacto->email);
            $sheet->setCellValue("C{$fila}", $contacto->telefono);
            $sheet->setCellValue("D{$fila}", $contacto->provincia);
            $sheet->setCellValue("E{$fila}", $contacto->ciudad);
        }

        $writer = new Xlsx($spreadsheet);
        $filename = 'contactos_' . date('Ymd_His') . '.xlsx';
        $tempPath = storage_path("app/public/{$filename}");
        $writer->save($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }
}

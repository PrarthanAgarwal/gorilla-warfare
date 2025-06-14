# PowerShell script to convert all GLB files to GLTF format using gltf-transform CLI
$sourceDir = "client\public\models\environments\jungle-arena\jungle-platform"
$glbFiles = Get-ChildItem -Path $sourceDir -Filter "*.glb"

Write-Host "Found $($glbFiles.Count) GLB files to convert..." -ForegroundColor Cyan
Write-Host ""

$convertedCount = 0
$failedCount = 0

foreach ($file in $glbFiles) {
    $inputPath = $file.FullName
    $outputPath = $inputPath -replace "\.glb$", ".gltf"
    
    Write-Host "Converting: $($file.Name) -> $($file.BaseName).gltf" -ForegroundColor Yellow
    
    try {
        # Use the latest gltf-transform CLI with copy command
        $process = Start-Process -FilePath "npx" -ArgumentList "@gltf-transform/cli", "copy", $inputPath, $outputPath -Wait -PassThru -NoNewWindow
        
        if ($process.ExitCode -eq 0) {
            Write-Host "✓ Successfully converted $($file.Name)" -ForegroundColor Green
            $convertedCount++
        } else {
            Write-Host "✗ Failed to convert $($file.Name)" -ForegroundColor Red
            $failedCount++
        }
    }
    catch {
        Write-Host "✗ Error converting $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
        $failedCount++
    }
    
    Write-Host ""
}

Write-Host "Conversion completed!" -ForegroundColor Cyan
Write-Host "Successfully converted: $convertedCount files" -ForegroundColor Green
Write-Host "Failed conversions: $failedCount files" -ForegroundColor Red 
$files = Get-ChildItem "d:\HALCONES\public\img2" | Sort-Object Name
$i = 1
foreach ($file in $files) {
    $newName = "halcones$i.jpeg"
    Rename-Item -LiteralPath $file.FullName -NewName $newName
    $i++
}

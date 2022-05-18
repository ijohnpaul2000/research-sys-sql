Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgsClient = "cmd /c client.bat"
oShell.Run strArgsClient, 0, false
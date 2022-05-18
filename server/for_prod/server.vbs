Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgsClient = "cmd /c server.bat"
oShell.Run strArgsClient, 0, false
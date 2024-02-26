command processor
    listens for commands, triggered by 'iok'
    if command is invalid, e.g. not one of x strings, print invalid, print iok help for help

can login via api key, save api key on user pc (for future logins). 

    on start up, check for API key. if none, prompt for API. else, display help (if not command, e.g. just 'iok')

can view selected project, and select/deselect project. (deselect sets current project to default)
    eventually add the same for workspaces, e.g. maybe workspc 1 has project x and y while wrkspc 2 has proj z

can start/stop timer. 
Timer started on project 'x'. 
Timer stopped on project 'x' timer reads '0:00:00'
if no project selected, the default project would be selected.

can display help, lists all commands and descrip. 

can display info, current project, if timer is running, current time for selected project total past 24hours (or today?), maybe list current time for 3 most recent projects (on most recent wrkspc?)    

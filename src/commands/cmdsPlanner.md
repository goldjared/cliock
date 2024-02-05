template:
-'cmd'
-help message (this also display if cmd is called with no other input)
-parameters, e.g. login user pass

for easier validation, a min len and max len. if 1st input (cmd input) is outside these values
then immediately cmd is invalid.

'login'
Login to clockify. login username password 
username password, strings

'start'
Starts the timer for currently selected project. If no project, default project.
optional: project, e.g. start workflow1, will make current selected proj workflow1, and start timer on said project.
    if start optional_proj_here doesn't exist, will say project optional_proj_here doesn't exist, would you like to create it?
        if 'yes' will create and make current selected proj optional_proj_here, and start timer on said project.
        if 'no' aborts
 

'stop'
Stops the timer for currently running timer. If no timer is running, returns no timer running

'info'
Displays current selected project, if timer is running or not. current project time for session,
[maybe] current time and date

'project'
Select or create a project. 
    project list 
        lists all projects
    project project_name
        switches to project_name, if project_name doesn't exist:
        will say project project_name doesn't exist, would you like to create it?
        if 'yes' will create and make current selected proj optional_proj_here, and start timer on said project.
        if 'no' aborts
    ?project default


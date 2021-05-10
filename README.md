5/10/2021

This app was written by Nathaniel Vele for Rapptr Labs.

This app is written in React and its functionality includes the following:

Login Page - The user can enter information to attempt to login to the TODO site.
    The page self-validates on change and after validation sends a request to the Rapptr Labs
    API to login, given that the credentials are correct. The user information is also stored in 
    session storage.

TODO Page - The user can add, delete, edit and search for their TODOs on this page.  All TODOs 
    made by the user are stored in local storage and will be displayed if the user refreshes the page 
    or logs out and logs back in.
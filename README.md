 # Documentaion and Execution Details

 ## Understanding Schema
 a. Name: It requires a name which is atleast 5 characters in length.

 b. Number: Your Number which should be unique and minimum of 10 digits in length.

 c. Group: You can enter in which group you want to categorize it. Leave blank for deafult 'General' group.

 ## Validations
 a. Name should be at least 5 characters in length.

 b. Number should be of 10 digits in length.

## For authentication

### `Create a new user: @ POST: /api/auth/createuser`

    If the validation is not matched, array of errors with bad request will be the response.
    
    If the user with same number is already exists, he will get error in response.

    If all requirements met, then a new user will be created and will be provided a Authentication token along with created user details in response.

    The auth-token should be passed in header while hitting the api while performing any operations in Contact Book to get authorization.
    
*Note: If you have 'auth-token', you have access to whole Contact Book.*

*Note: You can perform operations in Contact Book only if you have authorization (auth-token), else you will not get desired response and will get bad request.*

*Note: If you have other user's auth-token, you can still access Contact Book without any issue.*

## For fetching all contacts with pagination

### `Fetch all contacts @ GET: /api/contacts/getallcontacts?page=1&limit=3 -Authentication required`

    You can pass your desired values in 'page' and 'limit', you will get response accordingly.

    If you don't want pagination, you can hit API without them and you'll get response without pagination.

## Fetch single contact

### `Fetch single contact @ GET: /api/contacts/getcontact/:id -Authentication required`

    You can pass 'id' in url while hitting api to get the desired contact information.

## Add a new contact

### `Add new contact @ POST: /api/contacts/addcontact -Authentication required`

    If the validation is not matched, array of errors with bad request will be the response.
    
    If the contact with same number is already saved, he will get error in response.

    If all requirements met, then a new contact will be saved and passed in response.

## Adding bulk contacts

### `Insert many contacts @ POST: /api/contacts/addbulkcontacts -Authentication required`

    If the validation is not matched, array of errors with bad request will be the response with the index number at which the validation failed.
    
    If any contact with same number is already saved, he will get error in response.

    If all requirements met, then bulk contacts will be saved and passed in response.

## Search contacts with phrases in Name and Group

### `Search Contacts @ GET: /api/contacts/searchcontact/:key -Authentication required`

    You can pass the phrase with which you want to search a contact in 'Name' and 'Group' as 'key' in url (example: 'Saksham') and the searched contact will be sended as response if the key matches with any contact, else the response will be empty results.

## Update a contact

### `Update contact @ PUT: /api/contacts/updatecontact/:id -Authentication required`

    If the validation is not matched, array of errors with bad request will be the response.

    You can pass any field(s), i.e, Name, Number, Group, whichever you want to update/change. The passed field will get updated and rest will remain same as it is.

    Pass the 'id' of the particular contact that you want to update in the url while hitting the api.

    If the passed 'id' does not match any contact, it will give contact not found error.

    If all requirements met, then the contact will get updated and passed in response.

## Delete a contact

### `Delete contact @ DELETE: /api/contacts/deletecontact/:id -Authentication required`

    Pass the 'id' of the particular contact that you want to delete in the url while hitting the api.

    If the passed 'id' does not match any contact, it will give contact not found error.

    If all requirements met, then the contact will get deleted and passed in response.
# AltspaceVR Programming Project - Spaces Admin Web Frontend

## Instructions

Use the given data source to build an administration interface for AltspaceVR's "spaces" directory and then build some enhancements to the interface.

## Goals

We use this test to get a sense of your coding style and to how you creatively solve both a concrete problem and an abstract one. When we receive your project, here is what we will be asking ourselves:

- Does the admin interface meet the requirements?
- Is the HTML, JavaScript and CSS well structured, easy to read and understand, and organized well?
- Is the frontend implemented in a way that enables reuse and extension?
- Do the enhancements implemented work well?
- Are the enhancements creative, challenging to implement, and just plain cool?

To work on the project:

- Fork and clone the repo.
- Use the Promise-based data source provided in the `lib/data/` folder to populate the interface you create.
- Your application should (and need only) be compatible with the latest version of Google Chrome.
- You may use any framework or library to help you build the interface.
- You shouldn't have to build any server-side component to complete the project.

# Part 1 - Admin interface

If you've tried AltspaceVR, you'll have seen our directory of "spaces" which users can visit and interact in. Admins can spawn new spaces and manage them in various ways. Create an interface that allows admins to view and edit spaces (their environments, titles, descriptions and user restrictions).

Take a look at the `example/` folder for a working example. You should be able to load it with a simple HTTP server or view it on our [github.io site](https://altspacevr.github.io/altspacevr-project-html-ui/example). The example is not very pretty. Try to do a better job of styling the interface to show off your CSS skills. Also feel free to structure the UI as you like. You do not have to replicate the working example, as long as you meet the functional requirements listed below. 

- The interface should list existing spaces, displaying their details.
- You should be able to edit any of the spaces in the list.
- The edit form should allow you to edit all of the fields associated with a space (see below) except for the "created by" field, which should default to the admin user for this project.
- The editor fields should have appropriate input types. E.g. Boolean values should be checkboxes and the list of members in a space should allow you to select any of the existing users in the data store.
- You should also be able to create and delete spaces.
- The changes you make to spaces should be persisted to the data store through the provided API.

The requirements do not call for any form/model validation but feel free to add validation if you can.

The `Data.js` file provided in the `lib/data/` folder implements a Promise-based data store which stores and retrieves simple JavaScript objects representing Users and Spaces. You should not have to modify the data store (at least for the Part 1 of the project) but you may have to wrap it with a shim, depending on what framework you choose.

```js
Data
    .Users
        .getAll()
        .getById(Number id)
        .updateById(Number id, Object data)
        .create(Object data)
        .deleteById(Number id)
    .Spaces
        .getAll()
        .getById(Number id)
        .updateById(Number id, Object data)
        .create(Object data)
        .deleteById(Number id)
```

All of the stores' functions return Promises which resolve to an array (in the case of `getAll`) or a single object that you've retrieved, updated or created. The `deleteById` function also returns a Promise but it does not resolve to a value.

Users and Spaces have the following schema:

```js
User
    Number id
    String email
    String first_name
    String last_name
    Boolean admin
Space
    Number id
    String title
    String description
    Boolean welcome
    Boolean private
    Boolean featured
    Number created_by
    Array members 
```

The `admin` flag determines if a User is an admin or not. The `welcome` flag determines if a Space is designated the "welcome" space that users first visit when they enter Altspace. The `created_by` field is the `id` of the user that created the space and the `members` field is an array of User `id`s for users who are allowed to enter the space or `null` if there is no restriction. It is up to you to load the corresponding User objects by `id`.

The data store comes pre-loaded with data which you can see in the `lib/data/db.json` file.

# Part 2 - Enhancements

Now that you have a working admin interface, enhance it with improvements that showcase your skills and creativity. This is the open ended part of the project, and is your chance to blow us away! 

Some potential ideas:

- Make it easier to perform bulk operations (setting flags, deletes, etc) 
- Add a search function or a tagging function so that spaces are easier to manage and organize.
- Add stats and visualizations to the spaces (number of users, number of visits, etc)
- Anything you want! Got some new UX technique or library that you want to try? Use this as an excuse! Don't feel limited by the scope of Part 1.

## Deliverable

In your repo, you should clobber this README file with your own describing your project. Any instructions or known issues should be documented in the README as well.

E-mail us a link to your Github repo to `projects@altvr.com`. Please include your contact information, and if you haven't submitted it to us already, your resume and cover letter. 

We hope you have fun working on the project, and we can't wait to see what you come up with!
    
[The AltspaceVR Team](http://altvr.com/team/)

# Testlet Basic Information

## Compiling/Running

Prefered method: compiling through node package manager (npm) via terminal command "npm run dev", command should be run under the testlet directory. Can be compiled from Visual Studio Code terminal, windows powershell, gitbash, and other terminals supporting the "npm run dev" command. 

## Compatable OSes

Compatable with PCs running MacOS, Windows, or Linux. Cannot be easily compiled on mobile devices with the exception of downloading a third party linux terminal such as Termux for Android. Testlet is not hosted on a domain and so must be ran locally on an individual machine. 

## System Requirements

Requires a terminal compatible with NodeJS to run npm commands and a web browser.

## Library Requirements

Must install NodeJS and NPM to compile. All other dependencies and libraries can be obtained using npm install under the erichmond directory.

## High Level Documentations

* FlashcardBackend

This diagram outlines the data and service flow between our database and users, specifically when users interact with flashcard sets, including creating or deleting a flashcard. During the creation of flashcards on the "Create a Set" page, our webpage verifies the user's authentication status. We utilize the Firebase SDK, a set of libraries and tools that integrate Firebase with Node.js, our backend JavaScript environment. In this environment, we use the Firestore database from Firebase, which stores data in documents, to manage our flashcards. Our backend API, React, controls the state of functional components, allowing users to interact with flashcards by clicking buttons on the screen.

* LoginBackend

This diagram illustrates the login flow between our Firebase authentication system and users. At the login page, the Firebase SDK integrated with the webpage initiates the Google authentication flow by presenting a "sign-in with Google" button. Upon clicking the button, the user is redirected to the Google sign-in page, where they are prompted to enter their credentials/sign-in. Following authentication, Google verifies the credentials and transmits an authentication token to Firebase. The authentication token is then used by Firebase to authenticate the user and establish a new Firebase user account. This entire process occurs quickly, and the user is swiftly redirected back to the Testlet webpage.

* Frontend

This diagram illustrates the data and service exchange process between our web application and its users. By clicking links on our webpage, particularly on the navigation bar, module routing is utilized to enable redirection of the user to different pages within the application. These pages include various components, such as the flashcards or the footer, which allow the user to interact with the webpage in various ways.


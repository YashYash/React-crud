Author: Yash Saxena

This is an app that pings gihub's public api: https://api.github.com/repos/npm/npm/issues to get and display issues related to npm. It also allows you to view and individual issue's details and comments.


Markups:
	- node (version 0.12.0 - 0.12.7)
	- npm (latest stable version is recommended)
	- gulp (command line: npm install gulp -g)

Run the app:
	1. Download the zip file
	2. In the folder's root directory run: npm install
	2. cd into the "client" directory
	3. run gulp app-one
	4. In your browser navigate to localhost:2000

	(To enable livereload, download the chrome store app, and turn it on. Live reload is a little finiky. Needs to be looked at refactored.) 
	(If you run into issues while running this app. Feel free to email me at yash.saxena1217@gmail.com.)

Disclaimer:

	Github's public api: https://api.github.com/repos/npm/npm/issues has a rate limit of max 60 requests per hour if the requester is not authenticated (which is our case). Therefore if the app stops displaying issues, please check the network to see if this is the case

	Running tests:
		- Development was not test driven
		- I did not have time to write tests for this app due to time restraints :(
		- I would have used jest and react's test utils
		- I have set up the __tests__ directory, as well as the preprocessor files
		- However I discovered that react-tools has been deprecated
		- If you would like to see tests, contact me (yash.saxena1217@gmail.com)


About the app (optional):

Navigation:
	- 2 directories Client and Server
		- Client
			- It is set up to render multiple react apps
			- It is also set up to run multiple gulp builds
				- View code at client/gulpfile.js
				- watches files, minifies templates', lints and minfies css, lints and minifies scripts
				- config.js is the configuration of each app. Needed for gulpfile.js
			- Both css and js have similar sub directories
				- Css
					- Categorized by react-apps
					- Each app is categorized by the components and dom design
				- Js
					- Categorized by react-apps
					- Each app has a components, actions, stores and libraries directory
					- main.js is the file that initiates the react apps
			- Views
				- The views directory holds the server side rendered jade files
				- The react apps render in these jade files
			- Build
				- This is where the minfied code rests
				- Categorized by react-apps

			** Reason as to why the app is set up this way:
				 From experience (8 angular apps on client side at work), when working on a web app that is comprised of multiple SPAs (Angular, ember, react ...), it is not required to minify the entire client side app. Minifying and linting just the app that you are working on would make development faster. When deploying to prod, different scripts will need to be run in order to minify and lint all the files to prepare them for prod. I have not provided that script.

		- Server
			- Api
				- This is where the server side routes will exist
				- These routes do not render files, they send responses back
			- Routes
				- These are the routes that render views
			- App.js
				- The file that configs the app and sets the middlewares
			- Start.js
				- The file that is used to create and run the server
Enjoy :)
firebase-schema - Make firebase-schema.js
redux-schema - Make redux-schema.js
actions - Make actions.js file add all actions to it for now. **Dont refer to actions.js. Make a new one going through all actions. Same for Reducers.
reducers - Make reducers.js file and add all reducers to it for now.
hello-world - Build Hello World
    - npm init -y
    - npm install --save react react-dom && npm install --save-dev html-webpack-plugin webpack webpack-dev-server babel-{core,loader} babel-preset-{react,es2015,stage-0} style-loader css-loader
    - Basic webpack.config.js with css and style loader
    - .babelrc
    - mkdir app
    - touch index.js && touch index.html
    - Fill out index.html
    - Add Hello World to index.js and render it.
    - add start and prod to package.json
react-router - Add React Router
  - npm install --save react-router
  - Make containers folder
  - Make Main folder
      - MainContainer.js and move HelloWorld code to it
  - Make index.js of containers folder
  - Make config/routes.js and fill out routes
developer-experience
  - npm -v
  - node -v
  - Eslint
    - http://standardjs.com/
    - npm install --save-dev eslint eslint-{config-standard,plugin-standard,plugin-promise}
    - Add lint to node script
    - touch .eslintrc
    - run 'npm run lint' and see errors + gross ERR! npm code.
    - Fix ^ by adding exit 0 to npm lint script
    - Notice we're not linting for React stuff
    - npm install --save-dev eslint-plugin-react
    - Add react plugin to eslintrc
    - Fill out rest of eslintrc besides rules
    - Add rules
    - Fix errors but should still be one error in index.js with exporting file
      - Mention how the export is experimental so we need to have eslint use the babel parser
      - Add npm install babel-eslint@next --save-dev
      - Add parser: "babel-eslint"
  - require('path') and PATHS object in webpack.config (take out index.js because of comment in notes about default when main in package.json)
  - Purposefully mistype a variable name and then check the error in the cosole
    - Gross index_bundle.js error.
    - Add devtool: 'eval' to webpack config and restart webpack
    - show error message again with sourcemap enabled.
    - But we don't want eval to run in production. In fact, we need to change quite a bit for prod.
  - Talk about production vs development configs. Multiple ways to do it.
  - create base, developmentConfig, and productionConfig as empty objects
  - Production Prep (test just in module.exports)
    - process.env.npm_lifecycle_event
    - isProduction variable
    - Steps with Production React
      - initial file size ~ 873kb
      - process.env.node_env to 'production' (do then show file size) ~833kb
      - devtool from 'eval' -> cheap-module-source-map (do then show file size) 179kb
      - new webpack.optimize.UglifyJsPlugin({minimize: true}) (may not be needed)
  - Add shared config to base
  - Add devtool: 'eval' to developmentConfig
  - Add devtool: 'cheap-module-source-map' to productionConfig
  - Add plugins to developmentConfig (just HTMLWebpackPlugin)
  - Add plugins to productionConfig
  - Now we need a way to merge them together
    - Change name to webpack.config.babel.js
    - Change requires to imports and vars to consts
    - Use Object.assign
    - Test it out
  - HMR
    - npm install --save-dev babel-preset-react-hmre
    - Enable babel-preset-react-hmre when were in dev mode
      - add process.env.BABEL_ENV = LAUNCH_COMMAND
      - Add hmre to .babelrc
      - Add new webpack.HotModuleReplacementPlugin() to dev config
      - add devServer to developmentConfig
      - Test it out by changing Hello World
      - Add a styles.css file and test it out with styles
      - Add state that changes on click. Change state then show how state remains the same.
      - Once finished remove code that just demonstrates HMR
  - Now talk about how the paths will be a pain when each component has its own folder
    - ie import Header from '../../components'
    - Fix by adding resolve root to webpack base
    - Remove all ./ and ../ from imports
home
  - this.props.children in MainContainer.js
  - In containers Make Home folder with HomeContainer.js
  - Build out HomeContainer.js
  - Make components folder
  - Build out Home.js
  - Make index.js for components Folder and export Home
  - Add HomeContainer as IndexRoute in route config
  - Reset on styling using sharedStyles
  - Add styling to Home.js
  - Create Navigation folder in components
  - Build Navigation.js (no styling)
  - Add <Navigation isAuthed={true} to MainContainer
  - Style Home and Navigation components
authenticate-mocks
  - Create Authenticate folder in containers, registerContainer.js file
  - Create Authenticate folder in components, Authenticate.js file
  - Add both to both index.js files
  - Add styling for Authenticate component
  - Create FacebookAuthBtn folder in components
  - Create FacebookAuthBtn component and style it
  - Import and use FacebookAuthBtn in Authenticate.js
  - Create helpers folder and then helpers/auth.js
  - Create mock auth.js
  - Create handleAuth function in AuthenticateContainer and pass it down through to FacebookAuthButton (see commit Log mock auth user)
redux-auth
  - Review what weve covered with Redux thus far (reducers.js and actions.js)
  - Show typical file structure for a Redux app (https://github.com/reactjs/react-router-redux/tree/master/examples/basic)
  - Talk about Ducks
  - Create redux folder & redux/modules folder
  - create redux/modules/users.js file
  - Move users from reducers.js to users.js file
  - Swap strings for constants and update initialState variable
  - export default the reducer
  - Now move users actions into users.js from actions.js. Talk about actionCreators
  - Talk about how well import both action creators and reducer (since reducer is default and rest arent)
  - DONT talk thunk yet. Let them see the problem first.
  - Now that we have our first reducer, we can create our Redux store.
  - In /app/index.js import the users reducer
  - Now we need to use createStore on the redux module
  - npm install --save redux
  - create the store using createStore(users) and then console.log the store to check it out
  - Talk about each property
  - call getState to see the state and talk about it.
  - Talk about how until this point weve just used "vanilla flux". This all could have been done without React.
  - Now, we want to make sure each component has access to the store, which is where react-redux and Provider come in.
  - npm install --save react-redux
  - Talk again how if we needed the store, we would have to pass it down as props. Thats lame. Provider fixes that
  - With Provider, we will be able to have each component specificy which part of the state it needs from the store
  - Import Provider
  - Wrap routes in Provider and pass it the store
  - Note that nothing is different. Cause we havent "connected" any components
  - Now when handleAuth returns the user, we want to be able to tell Redux about it. So we need to "connect" AuthenticateContainer to use dispatch
  - Walk through tying up connect. Use mapStateToProps to show the state change.
  - Now go back and look at the User reducer. There are three actions. We need to tell redux of all of them
  - Before auth() gets invoked dispatch 'FETCH_USER'
  - in .catch dispatch 'FETCH_USER_FAILURE'
  - in .then dispatch 'FETCH_USER_SUCCESS' and talk about each prop these fns are expecting
  - Talk about actionCreators make it so we can invoke functions instead of worrying about constants.
  - import fetchUser, fetchUserFailure, fetchUserSuccess and wrap them in dispatch
  - console.log(state) in mapStateToProps to show how the state is changing each time.
  - Now mention wrapping all the action creatos in dispath is kind of a pain. Introduce bindActionCreators
  - "Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly."
  - We already have an object whose values are action creators (userActionCreators)
  - import bindActionCreators
  - Create mapDispatchToProps function
  - Add mapDispatchToProps to connect
  - Remove this.props.dispatch and instead invoke this.props.fnName
  - Show that everything is working the same. (See First mapDispatchToProps commit)
  - Move mapStateToProps and mapDispatchToProps into connect as arrow fns
  - Update UI as redux store changes
  - Look at redux-schema and see that shape of users.
  - Pass in isFetching, error, and state['tylermcginnis'] (since thats what my mock id is)
  - Talk about propTypes in Container vs Component. Ill just use them in the component since we already have bindActionCreators and mapStateToProps
  - Add attrs to Authenticate Component
  - Add propTypes to Authenticate.js
  - Update UI now
    - Add temporary {error ? <p> error </p> : null}
    - Update Login with facebook button when fetching
  - Enough for this video. (see Tempory UI changes for FacebookAuthBtn commit)
thunks
  - see "Thunk for users" commit
  - Show handleAuth and managing all the different phases of the async action is annoying
  - What if...
    - Move auth() to users.js
    - in users.js import auth from 'helpers/auth'
    - create fetchAndHandleUser in users.js and remove exports from other actionCreators
    - Try to run it. Get nice error message about middleware.
    - npm install --save redux-thunk
    - modify app/index.js to use redux-thunk
router-auth
  - Connect MainContainer in order to get isAuthed and pass it to Navigation
  - Now that our NavigationBar is changing on auth, lets change routes.
  - Create components/Feed && Feed.js and add to index of component
  - Create containers/Feed && FeedContainer.js and add to index.js of container and render Feed.js
  - Add FeedContainer to routes
  - In AuthenticateContainer route to feed on successful auth
  - Now protect routes with React Router **THIS CHANGES LATER ON. See "new routes" commit for actual <Routes>
  - Create empty checkAuth function in app/index.js and pass it to getRoutes
  - Update routes to use onEnter={checkAuth}
  - Finish checkAuth function ***LOGIC CHANGED SINCE PUSH. SEE commit 'Add checkAuth logic'
  - Add logout functionality
  - Create a /containers/Logout container and add it to index.js
  - Inside of auth.js create a logout mock.
  - Inside of users.js create a logoutAndUnauth thunk that logs out then dispatches unauthUser
  - Add LogoutContainer to routes
  - Back in LogoutContainer call logoutAndUnauth onDidMount after you connect it
  - Add logout to Navigation
  - Test Logout works
firebase-auth
  - commit "Add firebase auth"
  - Create account at Firebase.com
  - Create project (or use mine)
  - "login & auth" -> Enable Facebook Auth *check
  - Create new facebook app (https://developers.facebook.com/apps)
  - Add a New App
  - Website
  - Type name -> Create a new app id
  - Select category then Create App ID
  - "Skip Quick Start" in top right corner
  - Copy in AppID and SecretAppId to Firebase
  - In Facebook "Settings" tab -> Advanced -> Client OAuthSettings -> Paste into Valid OAuth Redirect URIs "https://auth.firebase.com/v2/duckr/auth/facebook/callback"
  - Save Changes
  - make file config/constants
  - npm install --save 'firebase'
  - Finish config/constants.js with ref
  - Change the auth function in auth.js
  - Change the logout function in auth
  - Change the auth invocation in fetchAndAHandleUser
  - Change user around to get the correct properties into fetchUserSuccess
  - Now need to save users info
  - create saveUser in auth.js and import it into users
  - Add a .then to saveUser in fetchAndHandleUser promise chain
  - Make sure user is being saved properly
  - Now notice that we're not persisting the authed state since it's in redux. We don't want it in Redux,
    we want the source of truth to be firebase -ref.getAuth- and then update Redux accordingly. See 'Firebase as auth truth' commit for additions
  - Now update user: users['tylermcginnis'] in AuthenticateContainer if it hasn't been updated yet. See "Add initial Modal and authedId to user state"
/redux-devtools
  - See "redux-devtools section" commit
  - Mention normal devtools https://github.com/gaearon/redux-devtools
  - Talk about this one and pros of it https://github.com/zalmoxisus/redux-devtools-extension
  - Add to Chrome
  - Go to Redux tab. See "No store found"
  - Initialize devToolsExtension in app/index.js *Talk about compose cause youll need it.
  - Go through auth flow again and show Redux Dev Tools
*At this point make sure code matches commit "Add checkAuth logic"
/add-duck-modal
  - npm install --save react-modal
  - We need more state in our app. Specifically, the isOpen state on the model. That doesn't make sense to go in our users reducer though.
  - Our state tree is currently just users. We need more state than that though.
  - Create redux/modules/modal.js
  - Move over actions from actions.js and create constants
  - Move over reducer from reducers.js
  - modal.js should be finished.
  - in Navigation.js Navigation/ActionLinks add Modal with props and everyting *that will be made in the future.
  - Now, we need to use our modal state in MainContainer. But, we havent tied up the model reducer to our store. We need more than just the user reducer now, we need to combine reducers.
  - First, add a index.js file to /reducers just like we did for /components and /containers which exports every reducer well make
  - create index.js in /reducers and have it export users and modal
  - Now in /app/index.js, instead of importing just users,*  import all reducers with import * as reducers from 'redux/modules'
  - import combineReducers from 'redux' and change our createStore invocation to use it with all our reducers
  - Talk about how combineReducers will divy out each state to the correct reducer (through key names)
  - Now check out the new state with Redux Dev Tools
  - Now we need to update all of our mapPropToState functions since state is more than just users now.
    - update AuthenicateConainer
    - update MainContainer.js
  - Up to this point, the modal is working great. In the next vid well make it so you can actually submit the new duck. (see commit "All new duck/modal stuff besides adding")
  - jk ^ stuff plus make it when you close the modal it resets the state of the duck. All I did was add duck: '' to CLOSE_MODAL in modal.js
/adding-ducks
  commit: 'Add ability to add ducks'
  * at this point you should be able to click "Duck", have the modal popup, type in something, then on submit it logs that.
  * Make a api.js file in /helpers
  * Refer to firebase-schema about multple places ducks should go.
  * Build out api.js with saveToDucks, saveToUsersDucks, saveToDucksId, and saveDuck. ** this changed later on. See update file.
  * Update MainContainer to receive the authedUser and create the actual formatted duck then call saveDuck in api to test it.
  * See "Create api.js" commit for where you should be at.
  * Now we dont want MainContainer to call saveDuck, we want to it dispatch a thunk and the thunk handle all of that.
  * create redux/modules/ducks.js
  * Move over actions from actions.js
  * Move over reducer from reducers.
  * Update constants
  * export all functions
  * export ducks from index.js **Maybe dont need removeDuck. Check when all done
  * create duckFanout in ducks.js and finish with it looking like this "Initial duckFanout"
  * Now add in usersDucks
  * create usersDucks.js in redux/modules/
  * move over reducer
  * move over actions
  * add to index.js of redux/modules
  * uncomment addSingleUserDuck in duckFanout. Note nothing will change in our state yet since the usersDucks is undefined - for future
  * Now add in Feed reducer
  * create feed.js in redux/modules
  * import reducer from reducers.js
  * import actions from actions.js
  * add to index.js of modules
  * Add a new duck, examine the state to make sure were all good.
/listeners
  commit "add listeners.js"
  * create redux/modules/listeners.js
  * Move listener reducer over
  * Move listener action creator over
  * add to index.js of modules
/feed-ui
  * connect FeedContainer to redux and get feed state
  * Add propTypes for newDucksAvailable, error, isFetching, and ducks
  * Pass those props to Feed
  * Create setAndHandleFeedListener inside of feed.js which will lead to
  * Create listenToFeed inside of api.js
  * Now onMount of FeedContainer call this.props.setAndHandleFeedListener
  - Commit at this point. "Progress on FeedContainer"
  * Now build the UI for Feed
  - Commit at this point "Progress on Fee UI" && "Small change" && "Add numbers to like and reply" && see next commit to for minor changes
/likes
  * Create redux/modules/usersLikes
  * Add actions
  * add reducer
  * add to index
  * Create fetchLikes in api.js
  * import fetchLikes into usersLikes.js
  * Create saveToLikes and deleteFromLikes in api.js
  * import saveToLikes and deleteFromLikes from api into usersLikes.js
  * Create addAndHandleLike function and finish it
  * Create handleDeleteLike function and finish it.
  * DO a bunch of stuff. Meh.
  * This was a mess. Here's the commit "Like and Unlike are working"
/duck-view-likes
  * Create a DuckContainer folder
  * Create DuckView in components
  * Create a /duck/:duckId route
  * Connect FeedContainer to Context to get router
  * Create goToDuckPath method and pass it down to Duck
  * Make like works on both routes.


  ** Code Review. There is probably a lot of fluff that can be deleted or old code from refactors that wasn't deleted.
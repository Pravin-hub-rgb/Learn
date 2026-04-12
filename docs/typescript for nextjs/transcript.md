
Introduction
0:00
Hello friends welcome to the complete typescript tutorial in this tutorial we
0:05
are gonna explore the powerful features and benefits of typescript and after
0:11
completing this video you will be able to create your new projects without any
0:16
problem this tutorial consists of two parts in the first part I will explain everything
0:22
you need to know about typescript Basics types interfaces generics
0:30
Advanced objects and in the second part I will show you how to use typescript in
0:37
react we'll Deep dive into various typescript Concepts and techniques and
0:43
you'll see how easy to use typescripts with react and its Frameworks
0:49
and in the next videos we will create Advanced react and next.js projects
0:54
together so please like the video and let me know what kind of projects you want to see in the future if you are
1:01
ready let's get started okay I created a typescript file and
TypeScript Types
1:08
let's see how it works I will create my first variable here
1:14
and the main job typescript does is Define a street type for each variable
1:19
and force you to use the same type throughout the coding and it does this even if you don't Define any explicit
1:27
type for example here our variable is a string it means I cannot turn this into
1:32
a number let's try as you can see this is our first warning
1:38
and it says number is not assignable to type string we cannot write here a
1:44
number we cannot write any Boolean object array doesn't matter it has to be
1:50
a string let's do the same thing for a number I will say H the type of this variable is
1:58
a number it cannot be any other type
2:03
and also you can give your own types I said typescript understands the type of
2:09
variable but if you don't have any initial value you can explicitly provide
2:15
a type let's say HV type I'm gonna use here a
2:20
column and write my type and it's going to be a number let's try
2:27
I'm gonna give a string as you can see there is a warning but if
2:32
I give any number here there will be no problem and also if you
2:39
want to you can give your initial value like that and let's see what other types
2:45
we can use I will say string its type will be string
2:52
in this case I can use only a string here and we can create a Boolean
3:03
and the value of this variable can be only true or false
3:08
and also you can use multiple types I'll say test string or number
3:15
and I'm going to Define my type and it's going to be string or number it's that
3:21
easy in this case I can use only string or a number
3:28
let's try to change its type and as you can see there is a warning
3:34
and we call this structure as Union types okay we know strings numbers and
3:39
booleans what about arrays let's write here array
3:46
and I'm gonna create names array let's say John
3:52
chain and top basically this array includes only strings if I try to push
3:59
anything else inside these names array it's going to give me an error let's try names push and a number and
4:08
there is a warning and it says number is not assignable because it should be a
4:13
string that's right I'm going to add another name
4:19
and right now there is no problem let's do the same thing for numbers
4:27
I will say numbers push let's say true is going to be an error
4:33
but if I try to write here any number everything is going to work as expected but how we are going to Define our array
4:40
types I'll say test string array
4:47
and the type of this variable will be an array and the items inside this array
4:52
will be only strings let's create I will say one two three
5:00
and there is a warning but if I say strings
5:09
there is no problem let's do the same thing for number
5:15
I'm gonna write each type array and it's going to include only numbers
5:23
let's give some items and for this item there is no warning
5:30
because it's a number let's fix it
5:37
and that's all let's use Union types I'm going to say test string or number
5:45
array again it's going to be an array but the type of the items will be either a
5:52
string or number in this case
5:58
I can give any number here or a string let's comment this out by the way
6:06
and what about objects
6:12
I'm going to create here an object let's say user
6:18
is going to have a username let's say John h
6:23
22. and I'm going to add here a Boolean let's say is admin and it's going to be
6:30
false you don't have to Define any type here because typescript understands that the
6:36
user is an object and it has a username which is a string H is a number and is
6:44
admin is a Boolean let's try to change this username
6:53
I will say Jane and there is no problem because it's a string but if I write
6:58
something else let's try to change this age
7:04
18 and it's not gonna work because we defined this as a number
7:14
like that and the same thing for this property I'll say user is admin I cannot write
7:22
here any string or number it has to be a Boolean let's say true
7:30
what if I want to add here something else let's try to add a phone number
7:36
user.phone any string here
7:41
and as you can see there is a warning that because we don't have the form property
7:47
so I'm gonna comment this out and let's create another object but this time I
7:52
want to give some types I will say user object and I'm gonna write my types so be
7:59
careful here you have to write a column it's not equal
8:04
and I will say username it's going to be a string H is a number
8:10
and each admin will be Boolean let's use this object
8:18
I will say username John I will give H and there's a warning
8:24
here and it says is admin is missing we have to use all purpose here again we
8:31
cannot add anything else but also we have to use all proper adhesive
8:38
we cannot change them so I will say is admin and it's going to be true
8:45
if I try to add a phone it's not gonna work
8:51
but let's say in our application we have users and some of these users have a
8:57
phone number and the others don't have in this case I should use a condition here
9:03
let's copy this object I'm using the same name let's change here and I'm gonna write here phone is
9:11
going to be a string but I will say it's not required let's try
9:19
username h is admin
9:26
and as you can see there is no warning but even if I add here a phone number it's gonna work
9:33
that because we can call it conditionally and one more thing I want to mention about those types and it's
9:39
going to be any type if you don't provide any value or any
9:45
type its type will be any as you can see it says test any implicitly as an any
9:52
type it's going to be a string [Applause]
9:57
volume array object anything but you should be careful because this
10:05
is why we are using typescript we should use a type you should use this any type
10:10
only when you are not sure about the type I can do the same thing for an array I'll say test any array
10:19
it's gonna be an array daily in this case I can give any value inside
10:25
this array number string volume or array or
10:31
whatever and if you don't write anything here by default its type is 80.
10:38
what about functions I will come here and say functions
TypeScript Functions
10:44
and I'm going to create my first function let's say say hi
10:49
and it's gonna just console log here hi and welcome
10:56
and in this case this variable is always a function if I try to write here a
11:01
string it's not gonna work and if I hover over my function here you
11:08
are going to see that its type is a function and it returns a void it means
11:13
it's not returning any specific type like number or string we are just using
11:18
console log here we are not returning anything but we can return let's try
11:24
let's say function return string is going to be a function but it's going
11:31
to return a string if I say console lock it's not gonna work but if I return a
11:38
string let's say la model as you can see the error has gone so how we are going
11:43
to take an argument let's create another function I'll see multiple
11:50
I'm going to take an argument here let's say num and again we didn't provide any type
11:57
here its type is any I'm gonna say it should be only number
12:04
and I'm gonna take this number and multiply by two I'll say return num
12:10
multiply by 2. let's check here as you can see it takes a number as a parameter
12:18
and returns a number we didn't specify here what we are returning but as I said typescript smart enough to
12:26
understand what it returns so this and this is exactly the same
12:33
let's change this name by the way and if I say don't return anything I'm just gonna
12:39
write void and let's change its name and there is
12:45
an error that because we are returning I will say do something but don't return
12:52
okay let's try to add another parameter I'll say
12:58
some is going to take two parameters the first one will be num1 let's say it's a
13:05
number and the second one it's a number and I'm gonna return
13:13
number one plus number two so when you call this function
13:19
you have to give two parameters here what if I want to add another parameter
13:26
but it's not required the only thing I should do is using a question mark I
13:31
will say another question mark and its type will be number and as you can see there is no warning
13:38
because we don't have to call this okay let's create another function
TypeScript Type Aliases
13:44
let function we are going to pass here a user and it's going to have a username
13:50
it's a string H it's a number and let's say phone it's
13:56
not required it's going to be a string and you can add many other items here
14:02
and I'm just going to write user dot using it there is nothing wrong with this
14:09
function but here is too long and when you create a project probably you will have more than three properties and it
14:15
looks pretty ugly here so what we are gonna do is using type aliases
14:23
basically instead of giving any type here like that we can create our custom type and use it in this parameter what I
14:31
mean by that I will come here and say type and I will say user type
14:37
and it's going to have a username string H is a number
14:43
and four and we can use this type everywhere
14:49
let's create this function again I'll say better function
14:56
and it's going to have a user but its type will be user type
15:03
console log user and if I enter dot as you can see we have all our properties
15:10
we can use anything we want and this is why typescript is great you might think
15:15
that you are wasting time writing those types but actually you are using a lot
15:21
of shortcuts and moreover your types are safe
15:26
right now I'm gonna create a functional signature basically we are going to create a prototype of our function and
15:33
using that prototype we can create different functions what I mean by that so I will say type my function and it's
15:41
going to be a function and it's going to return let's say void
15:47
and I'm going to add here some parameters let's say first one is a number and the second one is a string so
15:55
using this I can create different functions let's say right
16:00
and its type will be my function it means it's going to take as you can see
16:06
a number and a string and the inside of my function will be void
16:12
let's say number and string and I'm just gonna write here
16:18
num times string
16:24
and it's great that because I can create different functions and what else I can
16:30
show you how to give an option I will say type user type
16:36
but I've already used this type so I will say user type 2 again username age and phone
16:43
and I'm gonna add here tip it's going to be a string but we are going to have
16:48
only two options it's gonna be dark or light we cannot give anything else
16:56
let's try I'll see user with Team its type will be user
17:03
type 2. it's going to be an object let's give our username h
17:10
and I will say team by the way it's a column not equal
17:16
and if I write here code you are going to see our options here I cannot give
17:22
anything else it has to be dark or light
17:27
okay I hope you understood how to use types but we have one more thing to use and
TypeScript Interfaces
17:34
its interfaces it's just like type but it's the
17:41
advanced version let's define our first interface and you are going to understand better I'll say interface I
17:48
will say I user you can give any name here but I prefer using it like that I and my type name
17:55
and it's going to be an object but be careful here remember how we are defining types
18:01
we are writing here equal but this time we are creating our object directly I'm
18:07
warning you because probably you are gonna forget this all the time but at the beginning it's normal when you start
18:13
using typescript in your projects you are gonna get used to it so I will say username
18:19
string let's say email and H a number it's like types but let's
18:28
say we have users in our application and some of these users are our clients and
18:34
some of them are employees so I can create different interfaces using this
18:40
user interface let's create employee interface I'll say I employee and it's going to
18:47
extend our user interface I will say extends I user
18:54
and I can add here any additional type and employee ID will be number
19:01
basically it has everything the user interface has but additionally we are
19:07
going to be using this employee ID let's try I'll say employee and its type will be
19:15
employee interface we are gonna need a username
19:21
email h
19:26
and also as you can see there is still warning because we are missing this employee ID we have to use it
19:36
let's say one but also I can create a normal user
19:41
let's say client its type will be a user
19:48
this time we don't need this employee ID it's that easy guys using interfaces and
19:54
types depends on your project don't be confused if you need to extend any type
19:59
just use interface if you don't need just use type
20:04
and let's talk about generics
TypeScript Generics
20:10
I'm going to create here an interface or type it's going to be post
20:16
and it's going to have an ID number title is going to be a string
20:24
description again string and also I'm gonna add here extra and
20:30
I'm gonna use here post users or post categories let's say we have an API and
20:36
we are fetching posts and we can fetch this post with its users or categories
20:42
let's create different interfaces and you are going to understand better I will say interface
20:48
and a user I've already used this name let's say author
20:54
and he's gonna have a user ID it's going to be a number and username
21:00
string and I'm going to create one more interface or type I category
21:08
again category ID is a number and category title
21:15
right now imagine that our post has multiple users and multiple categories
21:21
and I want to fetch this post using its users
21:27
or its categories there is nothing wrong with this definition there is no warning but what
21:34
if in the future we need something else like tags type of this post or maybe I
21:41
don't even know what I'm gonna need in the future each time I can't come here and create an interface and edit here I
21:48
just want to make here generic how I'm gonna do that let's come here
21:54
I will say interface I post better
21:59
it's going to be exactly the same but when it comes to Extra
22:04
I'm gonna say take the type as a parameter I'll say t you can write here
22:10
anything you want but the most common usage is T and use this T here and it's going to be
22:17
an array basically I'm gonna use here whatever I pass it can be string it can
22:23
be number or it can be any other interface let's try
22:29
that's it test me and its type will be I post better
22:36
and I'm gonna pass here straight and I will say ID
22:42
title description
22:50
and for extra it has to be an array and inside this array Will Be Strings let's
22:57
say string string two I forgot here comma
23:04
and as you can see it works as we expected and what else you can do you
23:10
can actually add here a limitation let's create another interface
23:16
I will say I post even better and here I will say t and it's gonna
23:25
extend object type and in this case you cannot give any string number or volume
23:31
again I'm gonna write my types and let's create another post I will
23:38
paste and as you can see we cannot pass here any string it should be an object
23:44
so I will say Heidi is going to be a number and username for example
23:52
in this case I should give here at least one object with this type
23:57
so I'm gonna say ID and username
24:03
and there is no problem and also instead of writing this like that you can add your
24:10
category or author interface that's a interface and as you can see
24:18
there is no problem because we already have ID and username but if I try to add
24:23
here something else it's not gonna work
24:29
and this is how we are using generics let's do the same thing for categories
24:40
and I'm just gonna change here
24:46
right now we don't have any limitation we can add here any object we want and
24:52
you are gonna see in the react lesson how useful they are when we create our
24:57
states and using react hooks okay guys that's all for the basics
25:04
we have learned many things and we are ready to use typescript V3 act if you
25:10
understood this part of the video is going to be really easy we are going to have some different react types and we
25:17
are going to have different components but don't worry you are going to understand everything
TypeScript React Props
25:25
okay let's see how to use props with typescript I have created two components
25:31
pause list and postcard in our page as you can see our component
25:37
is here and in this list component we are going to fetch our posts and using
25:42
this card component we are going to show each post so we are going to take a single post as
25:49
a prop so I will say props and we are going to use this here
25:54
firstly let's say a title it's going to be props.title
26:02
and a description
26:08
and this is our first warning it says there is no type let's write it here it's going to be an
26:14
object and it's going to have a title string and a description
26:23
right now we don't have any problem let's call this component in the list component
26:31
I will say postcard I will import and as you can see there is a typescript
26:37
warning here and it says you are missing description and title that's cute
26:49
okay let's open up and our first post is here it was easy that because we know
26:55
what we are going to pass here but what if we are fetching data from an API if
27:01
you are using react you can use react query and if you are using next.js I'm
27:07
gonna paste here my fetching function basically this function makes a request
27:12
to this endpoint let's see actually what we have inside
27:17
as you can see there are many posts here and they all have ID title and Body by
27:24
the way it's not description let's change it
27:36
like that okay so it's going to make this request and
27:41
if everything is okay it's going to return the posts array so let's call this function here
27:48
I'll say const data I will say await and get data right now I can comment
27:55
this out and create a map here I'll say data.map
28:01
and for each post inside this data we are going to call our component
28:06
postcard and if you are using a map don't forget
28:12
you should give here a unique key ID and right now I can give my title and
28:20
description of course you can give them one by one but I want to pass my probes
28:25
directly like that and as you can see there is an error here that because we didn't give
28:32
any type so I'm gonna come here and give my type
28:37
again title and description sorry buddy
28:46
but I forgot here ID is going to be a number
28:51
there is a problem here because we are using exactly the same type so what can
28:57
I do I can create my custom type and I can import this type in each component
29:03
to do that I'm going to open my sidebar and in the source folder I'm going to
29:08
create new folder and it's going to be types and inside let's say types typescript
29:16
file and here I'm going to create my type let's say post props
29:23
and it's going to be title body and also ID
29:28
let's export this type right now I can use it in my list
29:34
component let's do it here I'll import
29:42
and here
29:47
right now it looks clear and our types are safe and what else you can do here
29:53
if you want to you can give type for this data remember
29:59
it's an array and it includes our posts
30:04
it's exactly the same thing I will save and as you can see they are here
30:12
okay by the way if you want to structure your props like title and body
30:20
you can still use it I personally prefer using them like that
30:26
it really doesn't matter and when it comes to types folder
30:32
you can use a single file or if you want to you can create different files for
30:38
different types for example post props DOT type dot TS
30:46
but it can stay like that I just want to show you
TypeScript React Events
30:51
and right now let's see how to use components as a prop sometimes we need
30:58
to wrap our components with a parent component in this case our prop type will be different
31:05
to do that we are going to be using three components we are going to have this parent child
31:11
and another child so what I want to do is taking a prop
31:17
here basically it's going to be our components and I'm going to use them
31:23
here let's say actually this is the
31:30
parents and I'm going to use my child components like that
31:36
and right now these children has any type but we are going to be using react
31:42
components so I'm gonna come here and say children will be
31:48
react and react not let's try I'm going to open up my page
31:58
and in this page I'm going to call the parent and insight they'll say child
32:09
let's see as you can see this is the parent and our child's component
32:15
and also I can call my second child
32:22
and perfect this is what we are using to wrap our components if you are using
32:28
mixtures in the layout file you are going to see exactly the same
32:34
thing we have a root layout and we are wrapping our entire application with
32:40
this layout and we are using these children and it's
32:45
a react node okay
32:52
so let's see how to handle events with typescript as you can see we have an
32:57
input here we will be able to search using this button basically we are going to need on change and on click event
33:06
and here we have two posts using these buttons we are going to delete our posts to do that we should
33:13
pass our post IDs so right now you will see how to use events and how to send parameters
33:22
I'm going to open up my page as you can see we have three forms here
33:28
posts and delete buttons and this search input let's start it on
33:34
click event I'll say on click and I will say handle click
33:41
let's create this function const handle click
33:48
like that and right now what I want to do is preventing default behavior of
33:54
forms because when I click on this button as you can see it's refreshing the page I don't want to do that
34:01
remember what we are doing we are taking the event
34:06
and writing here event prevent default but first we should add here the event
34:13
type which type we are going to write here it's really easy to find I'm just
34:18
gonna come here hover over my own click event and you are gonna see that it's a
34:24
most event handler and it means our event is mouse event
34:30
so I will say react dot mouse to end and inside we shall pass the HTML
34:37
element again as you can see it's a HTML button element
34:44
I'm just gonna paste it here we are doing this that because it can be an element we can write on click event
34:52
for this input for this form or other HTML elements we have to pass here which
34:58
one we are using so if I say event dot you are going to see all these methods
35:03
that we can use I will say prevent default
35:09
and let's write here something searched
35:15
of course I'm not gonna write any search functionality we are just going to console log this I will click and as you
35:22
can see it's not refreshing the page and our text is here
35:27
what about this text input we are going to be using on change methods let's say
35:33
handle change and I'm going to create this function
35:39
let's actually Define here again event
35:44
and this time let's check as you can see it's a change event
35:49
handler in this case our event will be react.change event and the HTML element will be HTML input
35:58
element
36:05
it's that easy guys by the way I forgot here equal sign
36:10
and let's use this event I will say console log event Target and value
36:21
let's check I'll say hello oops
36:27
and as you can see it works and finding events type is that easy
36:33
guys if you are not familiar with typescript seeing this kind of types can be scary but as you can see only thing I
36:40
should do is come here and hover over any event or any HTML as you can see
36:48
HTML button element vs code and typescript does everything
36:54
for us by the way this is because of the extension I'm using it shows the result
37:00
of your functions without visiting browser console by the way I'm gonna create a video
37:06
about my favorite vs code extensions next week so you can see what extensions
37:12
you should use as a web developer if you don't want to miss that video you can open up Channel notifications
37:18
and after this information let's come here and handle this deleting
37:24
functionality I will say on click I'm gonna be using a function because we
37:32
are going to pass our post ID handle delete and I'm gonna pass here the post ID
37:38
which is one so I can do the same thing for the
37:43
second one and let's create our function
37:55
again it's a click event and we are clicking on a button I will use exactly
38:00
the same type and also we are going to get our ID
38:08
is going to be number and again you can prevent default
38:15
we don't want to refresh the page and I will say console log post ID
38:21
has been deleted by the way we didn't pass our event here
38:26
as you can see there is an error let's take our event and pass it here
38:37
if you are not using any parameter you don't have to pass this event as you can
38:43
see it's just a function name but we are able to use our event but if you are using any argument you should pass it
38:50
like that okay let's try I'll click here as you can see post one
38:58
and post 2. this is how we are using react events and you don't have to memorize anything
39:05
just hover over your elements and events and you are gonna see that after
39:11
creating a couple projects you won't even need to check any type you will
39:16
just write them by heart okay I'm gonna close here
TypeScript React useState
39:24
right now you are gonna see how to use use statehawk with typescript as you can see in this page we are going
39:31
to have this input and I want to store the username using a use datehook and
39:37
also I'm going to create a user use State and when I click on this button we are going to set a new user you are
39:44
going to understand better right now as you can see this is our page let's create our view States
39:51
first one will be username set username
39:57
use state at the beginning is going to be an empty string and one more
40:04
and it's going to be user and set user and at the beginning it's gonna be now
40:11
let's create here on change event and when we change this input we are going
40:17
to update this username remember what we are doing
40:22
handle change
40:29
we are going to take the event and remember which one we are using it's going to be change event
40:37
and HTML input and whenever it changes we are going to
40:44
update this username I will say event Target and value
40:50
and when I click on this button and I'll click
40:58
we are going to update our user using this username
41:03
I will say const handle click you and react
41:10
most event and I'm going to pass here my HTML element which is
41:16
the button element and again I will say prevent defaults
41:22
we don't want to refresh anything and I'll say set user
41:28
let's say name will be the username let's create one more thing here and
41:33
it's going to be session ID and I'm gonna use here math and random
41:40
of course it's going to create a random number between 0 and 1 but doesn't matter it's just an example and as you
41:47
can see there is a warning here and it says you are giving name and session ID
41:52
but at the beginning you said it can be null to prevent this error we are gonna
41:58
use generics and let's write here our type actually I
42:03
can create here I'll say user type
42:09
is going to be session ID number and name
42:16
of course you can use this types folder but I'm going to write them like that so you can see better it's just for the
42:23
tutorial purpose and I'm gonna come here and say it can be user type
42:30
or no in this case we don't have any problem and I can write here any condition
42:38
I will say if there is a user
42:43
right here user dot name logged in
42:49
if it's not show this for and as you can see there is no warning here that because we are using a
42:56
condition if there is a user it means it's not now anymore its type is user
43:03
type and inside this type we have a name this is why there is no warning but if I
43:10
use my username directly here now you say user.name
43:16
as you can see there is a warning that because at the beginning our user is now in such case you have to use here a
43:23
question mark basically it checks the user first if it exists it writes its
43:29
name that's right here be aware so you can see this in the GitHub repo
43:36
story and that's all I'm gonna close here
TypeScript React Context API Tutorial
43:46
right now let's see how to use use reducer and use context hooks I'm gonna
43:52
create a context API and we are going to have a team State and in that state we
43:57
are going to have the team color and theme font size using different actions we will be able to change the theme and
44:04
the font size since it's a typescript tutorial I'm not going to Deep dive into use reducer or use context if you don't
44:12
know how to use them or what they are you can watch my use reducer video and
44:17
to learn context API you can watch my previous video if you already know them let's continue
44:24
I'm going to come here and in the source folder I will create the context folder
44:33
and we are going to have team context
44:41
and right now I'm going to create my reducer to do that we are going to need an initial State I will say const
TypeScript React Reducer
44:48
initial state I will say team at the beginning is
44:53
going to be dark font size let's say 16.
45:00
let's create our reducer I'll save const reducer
45:05
remember what we are passing here we are going to have a state and action and
45:11
using action types we are going to change our state to do that we are using switch case block
45:18
but as you can see we don't have our types let's create them again I'm going
45:23
to create them here I'll say type State type
45:30
is going to be team string font size
45:37
is going to be a number and what about actions
45:42
I'll say action type action basically is an object that takes
45:49
an action type and payload and in our application for example we have two
45:55
action types first one is change team and the second one is change font size
46:00
we shouldn't pass anything else so I'm gonna write here
46:06
type should be change team or change font size
46:14
nothing else and also we are going to have a payload
46:20
when we change font size we will be able to send any number at the beginning
46:26
it was 16 pixels but you can add here any inputs and you can send any size
46:33
basically it's going to be a number and let's write them here I will say
46:41
State type and action type
46:47
okay let's take our action types remember it can be only change team or
46:54
change font size and the first case will be change t
47:00
as you can see it's here in this case the font size will be the same but I'm
47:07
just gonna change here if it's dark it's going to be light if it's light it's going to be dark let's do that I'm gonna
47:15
return a new state I'm Gonna Leave the font size same so I
47:20
will say state just change the team properly and I can
47:25
use here a condition I will say if it's dark
47:31
light if it slides back let's duplicate this
47:39
and another action type is going to be change font size
47:45
and this time the theme will be the same we are just going to change to font size
47:53
and we are going to take this value from payload I will say action dot pay Dot
48:01
and by default we are going to return our state we are not going to do anything and this is how we are creating
48:08
reducers but how we are going to consume this how we are going to dispatch our actions to
TypeScript React Context & useReducer
48:15
do that we should create a context API let's create here
48:21
I'll say export const team context
48:29
create context and again as you can see it works like
48:36
use State we should add here our generics but before let's remember what
48:41
we are gonna pass we are gonna pass an object and it's going to include a state
48:46
I can send initial value and the other parameter will be dispatch
48:54
and it's just gonna be a function it can return anything why we need them
49:01
because using this state we will be able to reach this theme and font size in
49:07
this case we can change our background color our font size and using this dispatch we are going to
49:15
send our action types and payloads and we will be able to click on those
49:21
buttons and change our team and font size so let's add here our generics
49:28
I will say State its type will be State type
49:34
and this patch will be react.dispatch
49:42
and we should pass here our action types as you can see it takes actions we have
49:48
already created I will say action type
49:54
why we did this that because this patch is a function but it cannot be any
50:01
function it should be a dispatch function and takes only those action
50:06
types nothing else and in this case our types are safe and
50:12
the possibility of making any mistake is right now really low it looks confusing
50:18
but trust me it's a Time Saver you are not gonna see any errors
50:24
okay so let's take this state and dispatch function from our reducer
50:30
firstly I'm going to create my team provider that we can wrap our applications
50:36
export const team provider
50:42
is going to take a children remember what it's type I will say children
50:49
react react not
50:54
and we are going to return a wrapper teamcontext dot provider
51:02
and right now we can wrap these children
51:07
and as you can see there is a warning and it says when you create your context
51:13
API you said you're gonna pass this state and dispatch but you are not passing anything let's pass them of
51:20
course before we should take them using our reducer I'll save const
51:26
ate dispatch use reducer
51:32
and I'm gonna pass here my reducer what was the name okay just a reducer
51:39
and also we are going to have the initial state and that's all let's pass them I will
51:46
say value state and dispatch
51:52
as you can see we don't have any error
51:57
right now we can wrap our application with this provider and after that we will be able to use
52:04
the state and dispatch function let's wrap our app
52:10
I'm going to open up my main layout if you are using pure react you can
52:15
directly use your app.js and here I'm gonna wrap my application
52:22
using team provider
52:30
okay let's open up our page
52:36
and use our context API here I'll say const
52:41
ate and dispatch use context hook
52:49
and I'm going to pass here my context team context let's see what we have I
52:55
will say console log state I'm going to open my console and as you
53:01
can see our object is here and it includes our team and font size
53:07
perfect so using this button I'm gonna dispatch change Team Action
53:13
let's do that I'm going to come here and say oh click
53:18
it's going to be a function and I will say this patch as you can see we need to
53:24
pass here our action type and action type includes a type
53:32
and in this type we have change font size and team I'm going to choose team
53:37
and right now we have a problem that because we don't have any payload but we
53:43
don't need any payload that because we are using a condition here and we are not changing anything using payloads but
53:51
for this action for example we are gonna use
53:57
so if I come here and paste here and change my action
54:03
change font size I can add here any payloads
54:10
that's a 20 and as you can see there is no error so how we are going to fix this
54:15
problem you might think that come here and right here question mark
54:24
so it's not going to be required you are going to see that there is no
54:29
problem but if you scroll down you will see that we have another problem it says in the reducer
54:39
you are using action payload but at the beginning you said it can be empty and
54:46
there's a conflict here typescript just wants to be sure that you are not gonna
54:52
pass an action without payload because you are using it here
54:57
so what we are going to do is splitting our action types so I'm gonna comment
55:03
this out and I'm gonna create two different action types
55:12
the first one will be let's say color action type
55:19
in this case our type will be only change team and we are not going to need any payload
55:26
and the second action type will be size action type and it's going to be
55:32
only change font size and right now we can send a number
55:37
and right now we can use color action type or size action type
55:44
I can come here and say color action type or size action type
55:52
but it's not a good idea because when you add another action type you have to
55:57
come here and use another or and another action
56:03
if you want to be more professional you shouldn't write the same thing again and again and it can cause a problem
56:10
what I'm gonna do is keep the same name and I will come here and create
56:17
type action type and it's going to be either color action
56:23
type or size action type so we didn't change anything here
56:30
we just split our action and we are calling this discriminated Union
56:39
and right now let's check our page as you can see there is no problem and if I
56:45
check my reducer as you can see it works as expected let's try
56:53
I'm gonna click here and as you can see our team is light dark light and font size right now it's
57:01
280. this is probably the most complex part of typescript with react but if you
57:08
understood here it means you won't have any problem with typescript anymore I
57:13
mean of course there are many other features of typescript but you won't have any problem to understand them
57:20
okay I'm gonna close here
TypeScript React UseRef
57:27
and here you are gonna learn how to use use draft hook as you can see we have
57:32
two inputs I'm going to show you two different usage of userf hook in the first one when we refresh our page our
57:39
application is going to focus on this input directly even if I don't click here it's just
57:46
gonna focus on this input and for the second one I'm gonna create the user
57:52
version of on change methods when I write here any name and click on the
57:57
send button we are going to take this value using use left let's open up our page as you can see
58:04
our inputs and button so I'm going to create my refs
58:09
I will say const input draft use refwork
58:17
and as you can see it takes a generic type and remember we are using input so
58:22
the type will be HTML input element
58:28
like that and at the beginning it's going to be not and I'm going to create one more use ref and it's for the second
58:36
input let's say username
58:42
input trap and let's use them here ref will be
58:47
input wrap and ref will be
58:54
username input ref and let's try to focus here focus on
59:00
this input to do that we are going to be using use effect hook
59:10
and it's going to run at the beginning dependency array will be empty and I
59:15
will say input wrap current value and
59:21
Focus as you can see it automatically adds this question mark because at the
59:27
beginning it's going to be null and we are able to use this method that because we are adding here which HTML element we
59:35
are using and let's see how it works
59:40
as you can see it has focused I will refresh the page and it's here
59:46
perfect what about here I'm gonna take this username
59:52
to do that let's create here on click event handle click
1:00:03
handle click I'm not going to use prevent default because it's not a form and I will just
1:00:10
say console log username is
1:00:18
the username input ref current
1:00:24
value and it adds this question mark again
1:00:36
I will say John and it's here why we are using user here
1:00:42
because when you use use State and update the username whenever you change
1:00:48
this input it means each time you are re-rendering your component but in this case there is
1:00:54
no rendering in my applications mostly I prefer using user app like that
1:01:00
and what else I'm gonna show you let's close here
TypeScript React Generics
1:01:07
let's actually use generics again and try to remember how to use it
1:01:13
I have two components here item lists and item right now I'm gonna create my
1:01:19
props I'll say type item props
1:01:27
I will say ID number title string and remember in the typescript
1:01:32
tutorial in the generics part I added here extra it was an array but the type
1:01:39
of this array was generic and remember how to use it I will say t
1:01:45
and I'm just gonna write it here let's take our props
1:01:51
it's going to be item props and I can add here any type I want let's say
1:01:57
object for example in this case if I go to the parent component and call my item
1:02:03
here I shall pass the ID
1:02:11
title and extra and this is going to be an
1:02:16
array and I can add here only objects if I say John for example as you can see
1:02:23
there's an error because it's not an object so I will say ID one
1:02:30
username John as you can see I'm adding a user
1:02:35
into this extra array okay I just wanted to remind you how to use generics and
1:02:42
right now I want to show you how you can combine types and how you can use typescript exclude
TypeScript Combined Types and Exclude
1:02:51
let's close them and open up our shape list and shape
1:02:58
component so what I want to do is create here a shape type
1:03:05
I will say it can be only Cube Square
1:03:13
rectangle or triangle
1:03:19
and I want to create different type and it's going to be two Dimension
1:03:24
shapes let's say two dimension shape type
1:03:29
and I will say it can be any type but not Cube because it's not two
1:03:35
dimensional to do that we are going to be using typescript exclude
1:03:41
and I'm gonna pass here the shape type and I'm going to exclude the cube
1:03:48
let's define here any shape its type will be
1:03:54
shape type and I can give here as you can see any type
1:04:00
and I want to create another shape let's say two Dimension shape
1:04:06
and its type will be two Dimension shape and right now as you can see cube is not
1:04:12
here it can be only two dimension right now let's create two other types
1:04:19
I will say team type is going to be only dark or light
1:04:29
and color type it can be wrapped
1:04:35
blue or yellow right now I want to combine
1:04:41
these two types to do that I'm gonna create a new type actually I'm gonna take this as a prop
1:04:48
let's say item props and I will say color
1:04:55
theme type and color type
1:05:00
let's take this prop item props and I'm going to open up the parrot
1:05:06
component and call this shape here
1:05:12
and I'm going to give color and as you can see it's the combined
1:05:18
version of our types we can choose anything but also let's say we can use
1:05:23
dark or light version of blue and red but we don't have dark yellow
1:05:29
only thing I should do is come here and use exclude
1:05:39
and right here what you want to exclude and I will say dark yellow
1:05:45
oops there's a typo and right now as you can see we have dark and light blue and red but we don't
1:05:53
have dark yellow
1:05:59
okay that's all guys I hope you enjoyed if you learned something new today please like the video and as I said we
Outro
1:06:07
are going to create many react and next.js projects together using typescript and once you create projects
1:06:13
you are going to get more and more familiar and I believe that you are not gonna have any problem okay that's all
1:06:20
let me know in the comments what kind of projects you want to see in the next tutorials don't forget to follow
1:06:26
namadev's social media accounts you can support lamade by joining the channel or
1:06:31
using the link in the description below I hope I will see you in the next tutorial goodbye
# Smart-Recycle
A simple web application to guide users to identify a trash item is recyclable or not

Team Members:

Kohl Peterson

Njenga Wamweya

Zhongyu Pan

Vipin Das

## Introduction

Welcome to our project Smart Recycle

Recycling has essential impact on both human being and the natural environment.

But with all different categories of waste, it can be challenging to do it right all the time...

Imagine if you had an app that can quickly tell you about the recyclability of a garbage item with a snaphot of the image. Wouldn't that be great?

Guess what , with Smart Recycle App,All you need to do is take a picture of your garbage and BANG!

We give you information about how you should recycle where you can recycle and where to ask help!

All of our recycling information are from RECYCLE BC,

Recycling has essential impact on both human being and the natural environment.

But with all different categories of waste, it can be challenging to do it right all the time...

Imagine: Smartly recycle whenever and wherever you want, only with a snapshot of your waste.

Never need to worry about how and where you need to recycle your garbage anymore!

Intrducing... Smart Recycle App!

With Smart Recycle App, 

All you need to do is taking a picture of your garbage and BANG! 

We give you information about how you should recycle

where you can recycle

and where to ask help!

All of our recycling information are from RECYCLE BC, 

We ensured they are concise and accurate!

Smart Recycle, we make your life easier, we make the nature merrier.


## Design

Our fronted is built on react which accesses the back end which is based on node.js and All of these are achieved through a rest API

We use express as our framework.  where you can post an image request and then wait for response from the cloud vision API. 
The cloud vision API is accessed by the server and responds with the best prediction of the image. 
Then this prediction is sent to recycle BC where we can gain information about the recycling instructions of the item 
And then all of this information is sent back to react frontend and displayed to the user.

## Challenges

Some chanllenges we encountered

Accessing RecycleBC API without documentation

Hosting on https for security of camera usage

Transforming raw prediction from API into usable results

Returning most likely match from Google Vision API 
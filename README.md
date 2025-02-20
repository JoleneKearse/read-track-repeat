# Read, Track, Repeat 📚

This is digital book tracking app is built with **React**, **TypeScript**, **Supabase**, **React Router**, **Tailwind CSS** and **The Open Library** and **Google Books** APIs.

<p align="center">
  <img src="react.png" style="width: 32px" />
  <img src="react-router.png" style="width: 32px" />
  <img src="typescript.png" style="width: 32px" />
  <img src="tailwind.png" style="width: 32px" />
  <img src="supabase.png" style="width: 32px" />
  <img src="node.png" style="width: 32px" />
  <img src="express.png" style="width: 32px" />
  <img src="vercel.png" style="width: 32px" />
</p>

This app **<span style="color: #996888">empowers</span>** users to:
- sign in and keep their information secure
- add newly read books
- view their library, including cover art
- verify they haven't already read a title before buying it
- get fun geeky reading stats

##  The Problem 🧩
<hr>
 
I am an avid customer of **Amazon Kindle** and **Audible**, but was missing a way to check which titles I've already read.  

It's not too big a deal in **Kindle Unlimited** as I can immediately see the last read page was at the end *and* I avoid *double-paying*.  

That is *not* the case in Audible.  I, for one, read a *ton* and find the synopses are insufficient to remind me I've already read that one. 

**Read, Track, Repeat** is the solution!   

## Challenges 🤔
<hr>

### The API

#### Which to use

The first **<span style="color: #996888">major challenge</span>** was not being an **Amazon affiliate**!  😆  

As this is an app to track books from **Amazon Kindle** and **Audible** it was difficult to find an **API** for the book info.  I found the best way to search for info was via **ISBN**, but Amazon has it's own closed-**ASIN**-system.  Unless I was an affiliate, I couldn't easily get this info.  

I periodically went down a rabbit-hole 🎩🐰 searching for a better way to do what I'm doing, but always came up with nada.

I decided to chain two APIs, **[Google Books API](https://developers.google.com/books)** & **[The Open Library API](https://openlibrary.org/dev/docs/api/books)**, to ensure I could grab as much info for my users as possible.  

The first was more comprehensive, but it is a giant pain in the 🍑 to ask users to find the ISBN by themselves, so I used to second to try and find the book and, *if possible*, grab the ISBN and try and fill in any missing data.  

Is this the best way?  

**No** and **yes**.

I'd prefer a simple way to grab the info from Amazon's ASIN.  But I haven't even found a *non-exorbitant-fee* service to convert this code to an ISBN. (*I even considered border-line not-allowed web scrapping.*)

Over the course of a year, this is still the most convenient way I can serve my app's users.

#### Getting better results

My chained APIs were working really well for **mainstream** books, like *The Martian by Andy Weir* which I used extensively in testing, but less so for my more-niche selections.

While I do have a pretty solid `EditBook` component that allows users to manually change the results - that wasn't good enough!

I tested with **[Postman](https://www.postman.com/)** and got better results.  So, huh?

Originally I was using the `encodeURIComponent` function to create the call to The Google Books API: `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`.  Once I checked out my string I discovered it was filling in spaces with `%` rather than the `+` I wanted!  

In came **regex** to give me more fine-grained control.  `searchItem.trim().replace(/\s/g, "+")`.  Problem solved!
  


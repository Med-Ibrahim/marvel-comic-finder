README.txt

App made by Mohammad Ibrahim, mi2399, as part of coursework for Steven Feiner's UI Class

The app requires no downloads to run. Bootsrap is linked in the index.html, and the requisite files are included in the correct path. Also included is a m5.js file that includes a hashing function obtained from https://github.com/blueimp/JavaScript-MD5. 

Design explanation:

	I chose to include as few components as possible, while also providing the necessary functionality, keeping in line with a minimalist design. Everything is on one page, and the page is divided into sections with large labels, so that the user knows exactly what each form or dropdown is for. I chose a table to display the results because it is a natural way to organize the information, and made sure the user knew how to navigate by including a simple instruction saying how many results are displayed and how to scroll through. I ran as many possible different queries as I could and adjusted the code so that the errors are prevented. I was able to find some Bootstrap components that are interactive, so the user is aware of system status. For example, when a text box is selected, the user is made aware by a blue highlight, and when a button is disabled, it wont get highlighted on mouseOver. 

	One design challenge I faced was getting the old information out of the table once I had to load the next page of results. I had to remove some hardcoded elements and instead dynamically add them so they could be added and removed with ease. This also made for cleaner code. 

Before start learning K6 -you need to **install the K6 and Visual studio code.**

Use below link and download the k6

https://grafana.com/docs/k6/latest/set-up/install-k6/

PN: you can download and run the latest official installer. - search this and click and it will download k6 for windows
 once download completed - install it and validate with powersheel windows with just simple using command 
 cmd> k6

 Download **Visual studio code.** use below link and download it.

 https://code.visualstudio.com/download

* How to run k6 scripts into local*

 > k6 run scriptname.js

 **How to run scripts on cloud**

 > k6 cloud login or k6 login cloud --token <<provide token here>>

 **Running k6 locally and exporting the results to the cloud**
 > k6 run script_name.js -o cloud

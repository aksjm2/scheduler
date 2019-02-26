# scheduler<br>
## overall
* Backend
  * Nodejs + express
  * RESTful API
* Frontend
  * Vue.js + webpack
## data
* using json data
  * univ_info json
    > univ_code : identify university<br>
    > univ_nm : university name
  * dept_info json
    > univ_code : identify university<br>
    > dept_code : identify department<br>
    > dept_nm : department name
  * subject json
    > univ_code : identify university<br>
    > dept_code : identify department<br>
    > subject_code : identify subject<br>
    > subject_nm : subject name<br>
    > grade : subject grade<br>
    > subject_time : array of subject time
## run
 * backend
   > using forever or node command
 * frontend
   > using npm run command<br>
   > build to backend --> npm run build

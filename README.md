# Quiz Details

This is an exam prep website. This website helps students figure out which learning objective/s they need to focus on. The quiz consists of 4 levels of questions which will be dispalyed based on the students results of the previous question. This is the latest version out of 2. The previous version will be provided upon request.

## Example
Let's consider a student focusing on a concept which has 8 learning objectives.
The first level consits of one massive question that covers all 8 of the learning objectives LO1 to LO8. The second level consits of two questions that each cover 4 of the learning objectives LO1 to LO4 and LO5 to LO8. The third level consits of four questions that each cover 2 of the learning objectives LO1 to LO2, LO3 to LO4,LO5 to LO6, LO7 to LO8. Finally level four consits of 8 questions each of which are about the individual learning objective LO1, LO2, ..., LO8. In total there are 15 questions.

If the student answers the first question correctly the quiz ends which means the student understands all of the learning objectives.
If the student answers a question incorrectly let's say a question about LO1 to LO4, the student will have to answer two questions in the following level. One about LO1 to LO2 and another about LO3 to LO4.


## Database
The questions are stored in a firestore database as follows ![alt text](./documentation/images/exam-prep-student-database-questions.PNG)
Each question is structured as follows ![alt text](./documentation/images/exam-prep-student-database-questionsStructure.PNG)
Pay great attention to the id of each question. ![alt text](./documentation/images/exam-prep-student-id-labelling.PNG)

## Logic
 ![alt text](./documentation/images/exam-prep-student-flowchart.PNG)

## Improvements needed
- Instead of manually adding the ids -since they can get complicated- in the companion website (https://exam-prep-lt9sf92rb-thembamtshelwane.vercel.app) the ids should be implicitly linked to the questions instead of explicitly.
- The student's results should be stored in the database.

For the extra features
- In the dashboard, there should be a list of available quizes instead of a hard coded fractions quiz. 
- Upon selecting the specific quiz from the list, route to that quiz and its data.

## Website
https://exam-prep-students.vercel.app/

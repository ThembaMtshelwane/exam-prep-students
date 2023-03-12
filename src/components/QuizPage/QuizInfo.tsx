import { Box, Flex,Heading,Text } from '@chakra-ui/react';
import React from 'react';

type QuizInfoProps = {
    
};

const QuizInfo:React.FC<QuizInfoProps> = () => {
    
    return (

        // <>
        //      <Box  border='2px solid red' m ={2} p={5}>
        //     <Text>Quiz Name</Text>
            
        //     <div id="instruction" className="long-texts">
        //         <p>
        //             <strong>Instructions: </strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque harum sit error repudiandae minus eligendi? Soluta, aliquam voluptates culpa incidunt ipsam enim, totam autem suscipit obcaecati dolorem laudantium perferendis corrupti!
        //         </p>
        //     </div>

        //     <Flex direction='row' border='2px solid red' p={2} m={2} >  
        //         <div id="learning-objectives">
        //             <h3>Learning Objectives Covered</h3>
        //             <ul>
        //                 <li></li>
        //                 <li></li>
        //                 <li></li>
        //                 <li></li>
        //                 <li></li>
        //                 <li></li>
        //                 <li></li>
        //             </ul>
        //         </div>
        //     </Flex>

        // </Box>
        
        // </>
         <>  
        <Box  border='2px solid red' m ={2} p={5}>
            <Heading>Quiz Name</Heading>
            <Flex direction='row' border='2px solid red' p={2} m={2} >  
                list of learning concepts
            </Flex>
        </Box>
        </>
        )
}
export default QuizInfo;
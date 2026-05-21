import Schema from "@/components/Schema";
import { generateSEO } from "@/lib/seo";
import RobotsTesterClient from "@/components/RobotsTesterClient";

export const metadata =
generateSEO({

title:"Robots.txt Tester",

description:
"Analyze robots.txt rules and technical SEO settings.",

path:
"/tools/robots-tester"

});

export default function RobotsTesterPage(){

const schema={

"@context":"https://schema.org",

"@type":"WebApplication",

name:"Robots.txt Tester",

description:"Analyze robots.txt files",

applicationCategory:"SEO Tool",

url:"https://yourdomain.com/tools/robots-tester"

};

return(

<>

<Schema data={schema}/>

<RobotsTesterClient/>

</>

);

}
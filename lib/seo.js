export function generateSEO({

title,

description,

path="/",

keywords=[],

image="/og-image.jpg"

}){

const baseUrl=

"https://seo-tools-xi.vercel.app";

const url=

`${baseUrl}${path}`;

return{

title,

description,

keywords,

metadataBase:

new URL(baseUrl),

alternates:{

canonical:url

},

robots:{

index:true,

follow:true,

googleBot:{

index:true,

follow:true,

maxSnippet:-1,

maxImagePreview:"large",

maxVideoPreview:-1

}

},

openGraph:{

title,

description,

url,

siteName:

"Free SEO Tools",

images:[

{

url:image,

width:1200,

height:630,

alt:title

}

],

type:"website"

},

twitter:{

card:

"summary_large_image",

title,

description,

images:[image]

}

};

}
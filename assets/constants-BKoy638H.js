function s(r){var o,n,t="";if(typeof r=="string"||typeof r=="number")t+=r;else if(typeof r=="object")if(Array.isArray(r)){var a=r.length;for(o=0;o<a;o++)r[o]&&(n=s(r[o]))&&(t&&(t+=" "),t+=n)}else for(n in r)r[n]&&(t&&(t+=" "),t+=n);return t}function u(){for(var r,o,n=0,t="",a=arguments.length;n<a;n++)(r=arguments[n])&&(o=s(r))&&(t&&(t+=" "),t+=o);return t}const i="/jlpt",f={defaultTotalQuestion:10},c={baseUrl:i,n5VocabQuizBookmark:"/n5quizBookmark",n5VocabQuiz:"/n5quiz"};export{f as C,c as L,u as c};

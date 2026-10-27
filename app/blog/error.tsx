'use client';
export default function BlogError({ reset }: { reset: () => void }) {
  return <section className="container-maison" style={{paddingTop:80,paddingBottom:100}}><h1 className="font-serif" style={{fontSize:44}}>Our stories are taking a moment.</h1><p style={{margin:'20px 0'}}>Please try loading the blog again.</p><button className="btn btn-p" onClick={reset}>Try again</button></section>;
}

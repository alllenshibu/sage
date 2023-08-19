import {   ShowMore,Hero } from "@/components";

export default async function Home({ searchParams }) {


  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Services</h1>
          <p>Explore our services you might like</p>
        </div>

      </div>
    </main>
  );
}

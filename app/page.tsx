"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  const [value, setValue] = useState("Hi");
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const [pelvic_incidenceTXT, setpelvic_incidenceTXT] = useState("");
  const [pelvic_tiltTXT, setpelvic_tiltTXT] = useState("");
  const [lumbar_lordosis_angleTXT, setlumbar_lordosis_angleTXT] = useState("");
  const [sacral_slopeTXT, setsacral_slopeTXT] = useState("");
  const [pelvic_radiusTXT, setpelvic_radiusTXT] = useState("");
  const [degree_spondylolisthesisTXT, setdegree_spondylolisthesisTXT] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setShowOutput(false);
    event.preventDefault()

    const form = event.target as HTMLFormElement; // Cast event.target to HTMLFormElement

    const pelvic_incidence = (form.elements.namedItem('pelvic_incidence') as HTMLInputElement).value;
    const pelvic_tilt = (form.elements.namedItem('pelvic_tilt') as HTMLInputElement).value;
    const lumbar_lordosis_angle = (form.elements.namedItem('lumbar_lordosis_angle') as HTMLInputElement).value;
    const sacral_slope = (form.elements.namedItem('sacral_slope') as HTMLInputElement).value;
    const pelvic_radius = (form.elements.namedItem('pelvic_radius') as HTMLInputElement).value;
    const degree_spondylolisthesis = (form.elements.namedItem('degree_spondylolisthesis') as HTMLInputElement).value;

    /*const pelvic_incidence = event.target.elements.pelvic_incidence.value;
    const pelvic_tilt = event.target.elements.pelvic_tilt.value;
    const lumbar_lordosis_angle = event.target.elements.lumbar_lordosis_angle.value;
    const sacral_slope = event.target.elements.sacral_slope.value;
    const pelvic_radius = event.target.elements.pelvic_radius.value;
    const degree_spondylolisthesis = event.target.elements.degree_spondylolisthesis.value;*/

    setpelvic_incidenceTXT(pelvic_incidence);
    setpelvic_tiltTXT(pelvic_tilt);
    setlumbar_lordosis_angleTXT(lumbar_lordosis_angle);
    setsacral_slopeTXT(sacral_slope);
    setpelvic_radiusTXT(pelvic_radius);
    setdegree_spondylolisthesisTXT(degree_spondylolisthesis);

    const fetUrl = 'https://vertispine.me/?pelvic_incidence=' + encodeURIComponent(pelvic_incidence) + '&pelvic_tilt=' + encodeURIComponent(pelvic_tilt) + '&lumbar_lordosis_angle=' + encodeURIComponent(lumbar_lordosis_angle) + '&sacral_slope=' + encodeURIComponent(sacral_slope) + '&pelvic_radius=' + encodeURIComponent(pelvic_radius) + '&degree_spondylolisthesis=' + encodeURIComponent(degree_spondylolisthesis);

    /*/api/python? --- commented out in next.config.ts*/
    console.log(fetUrl);

    fetch(fetUrl).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.ok) {

        return response.json()
      }
    }).then(data => {
      setValue(data.prediction)
      setLoading(false);
      setShowOutput(true);
    })/*.then(data => setAllActivities(data))
        .then(data => {
            console.log(data);
            //var jsonData = JSON.parse((data));
            //console.log(jsonData[0].name);
        })*/

  }

  useEffect(() => {


  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="items-center fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Image
            src="/spine.png"
            width={40}
            height={40}
            alt="Picture of the author"
            draggable={false}
          />
          <code className="font-mono font-bold">vertispine</code>
        </p>
        <p className="my-5">by:
          <Link href="https://www.linkedin.com/in/jandrmota/" target="_blank">
            <code className="font-mono font-bold mx-2">Jan Drmota</code>
          </Link>
        </p>
      </div>

      <div className="relative place-items-center w-full max-w-5xl m-10">
        <div>
          <p className="my-5">This is a simulated application illustrating the use of a 3 class machine learning classification algorithm in the orthopaedics outpatient clinical setting, submitted to the BOA x Stryker AI in Orthopaedics Hackathon 2024.</p>
          <div className="flex items-center justify-center">
            <div className="cursor-pointer justify-center rounded bg-zinc-800/30 p-3 m-3">
              <Link href="/vertispine.pdf" target="_blank" rel='noopener noreferrer'>
                <code>⬇️ Download full detail PDF</code>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-500 border-gray-600 rounded p-3 m-3">
          <div className="flex flex-row">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white">
              <p className="text-black">1</p>
            </div>
            <p className="m-2">Selecting patient</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="my-3">
              <label htmlFor="pt_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient name:</label>
              <input disabled type="text" id="pt_name" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe &#10003;" />
            </div>
            <div className="my-3">
              <label htmlFor="pt_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient ID:</label>
              <input disabled type="number" id="pt_id" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234567 &#10003;" />
            </div>
          </div>
          <p className="text-sm my-2 italic">This would be connected to EPR system.</p>
        </div>
        <div className="bg-gray-500 border-gray-600 rounded p-3 m-3">
          <div className="flex flex-row">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white">
              <p className="text-black">2</p>
            </div>
            <p className="m-2">Retrieving data from images</p>
          </div>
          <div className="flex flex-row gap-5 m-5 items-center">
            <Image
              src="/l1.png"
              width={50}
              height={50}
              alt="Picture of the author"
              draggable={false}
            />
            <Image
              src="/l2.jpeg"
              width={50}
              height={50}
              alt="Picture of the author"
              draggable={false}
            />
            <p className="text-gray-400">&#10003;</p>
            <button disabled className="cursor-not-allowed text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-700">Select images</button>
          </div>
          <p className="text-sm my-2 italic">This would allow selection of images from PACS and an image processing algorithm would retrieve the data with clinician correction if necessary.</p>
        </div>
        <div className="bg-gray-500 border-gray-600 rounded p-3 m-3">
          <div className="flex flex-row">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white">
              <p className="text-black">3</p>
            </div>
            <p className="m-2">Analysing data</p>
          </div>
          <p className="text-sm my-2 italic">For the simulation, please input data you want the machine learning algorithm to predict. This would be auto-populated from the above.</p>
        </div>
        <div className="mx-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="pelvic_incidence" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pelvic incidence</label>
              <input type="number" step="0.000001" id="pelvic_incidence" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="##.######" required />
            </div>
            <div className="mb-6">
              <label htmlFor="pelvic_tilt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pelvic tilt</label>
              <input type="number" step="0.000001" id="pelvic_tilt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="##.######" required />
            </div>
            <div className="mb-6">
              <label htmlFor="lumbar_lordosis_angle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lumbar lordosis angle</label>
              <input type="number" step="0.000001" id="lumbar_lordosis_angle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="##.######" required />
            </div>
            <div className="mb-6">
              <label htmlFor="sacral_slope" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sacral slope</label>
              <input type="number" step="0.000001" id="sacral_slope" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="##.######" required />
            </div>
            <div className="mb-6">
              <label htmlFor="pelvic_radius" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pelvic radius</label>
              <input type="number" step="0.000001" id="pelvic_radius" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="###.######" required />
            </div>
            <div className="mb-6">
              <label htmlFor="degree_spondylolisthesis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Degree spondylolisthesis</label>
              <input type="number" step="0.000001" id="degree_spondylolisthesis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="##.######" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Predict</button>
          </form>
        </div>

        <div>


        </div>
        {loading ? (
          <p>Loading...</p>
        ) : <></>}
        {showOutput ? (
          <div className="bg-green-700 border-gray-600 rounded p-5 m-3">
            <p className="text-3xl my-3 font-extrabold">{value}</p>
            <div className="bg-gray-500 border-gray-600 rounded p-3 m-3">
              <code>
                <p className="font-bold">For input values:</p>
                <p className="text-sm">Pelvic incidence: {pelvic_incidenceTXT}</p>
                <p className="text-sm">Pelvic tilt: {pelvic_tiltTXT}</p>
                <p className="text-sm">Lumbar lordosis: {lumbar_lordosis_angleTXT}</p>
                <p className="text-sm">Sacral slope: {sacral_slopeTXT}</p>
                <p className="text-sm">Pelvic radius: {pelvic_radiusTXT}</p>
                <p className="text-sm">Degree spondylolisthesis: {degree_spondylolisthesisTXT}</p>
              </code>
            </div>

            <p className="my-2">Algorithm accuracy: 79.03%</p>
          </div>
        ) : (
          <></>
        )}
      </div >
    </main >
  )
}

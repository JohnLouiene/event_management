"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const sampleEvents = [
  {
    id: 1,
    event_name: "Tech Conference 2025",
    event_location: "San Francisco, CA",
    start_date: "2025-03-15",
    event_image: "/images/image_1.png",
  },
  {
    id: 2,
    event_name: "Music Festival",
    event_location: "Austin, TX",
    start_date: "2025-04-01",
    event_image: "/images/image_2.png",
  },
  {
    id: 3,
    event_name: "Food & Wine Expo",
    event_location: "New York, NY",
    start_date: "2025-03-20",
    event_image: "/images/image_2.png",
  },
];

const Dashboard = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div>
          <section className="relative flex items-center justify-center h-[500px] bg-black overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50 rounded-2xl"
              style={{ backgroundImage: "url(/images/landingPhoto.png)" }}>
            </div>
            <div className="relative z-10 text-center text-white">
              <h1 className="text-5xl font-extrabold">ILOVATION</h1>
              <p className="text-lg mt-2">Event Management</p>
              <Link href={"/book"}>
              <Button className="bg-purple-600 px-6 py-3 mt-4 rounded-lg">
                Book Events
              </Button>
              </Link>
            </div>
          </section>
      </div>

      {/* Popular Events Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto w-full max-w-6xl py-8 px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Events <span className="text-purple-600">Near You:</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <Card
                key={event.id}
                className="shadow-md hover:shadow-xl transition-all"
              >
                <CardContent className="p-1">
                  <img
                    src={event.event_image}
                    alt={event.event_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.event_name}
                    </h3>
                    <p className="text-gray-600">{event.event_location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <Button size="lg" className="bg-purple-600" onClick={() => setShowAllEvents(!showAllEvents)}>
            {showAllEvents ? "Hide Events" : "Check Out All Events For You"}
          </Button>
        </div>

        {showAllEvents && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-8 py-4">
            {sampleEvents.map((event) => (
              <Card key={`all-${event.id}`} className="shadow-md">
                <CardContent className="p-1">
                  <img
                    src={event.event_image}
                    alt={event.event_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.event_name}
                    </h3>
                    <p className="text-gray-600">{event.event_location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* About Us Section */}
<section className="py-16 px-24 bg-white text-black">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-8 py-4">
    <div className="relative">
      <Image 
        src="/images/icon_quotation_marks.png" 
        alt="Quotation Marks" 
        width={50} 
        height={50} 
        className="absolute -top-4 -left-8 md:-left-12"
      />
      <h2 className="text-3xl font-extrabold text-black ml-8">ABOUT US</h2>
      <h3 className="text-5xl text-purple-600 font-extrabold mt-2 ml-8">ILOVATION</h3>
    </div>
    <p className="mt-4 text-gray-600 max-w-2xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
</section>


    </div>
  );
};

export default Dashboard;

"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Globe } from "lucide-react";

// Define interfaces for our custom select items
interface SelectOptionType {
  value: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

export default function CreateEventPage() {
  const [eventSetting, setEventSetting] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<string>("");

  // Define select options
  const eventSettingOptions: SelectOptionType[] = [
    {
      value: "venue",
      label: "Venue",
      description: "Host event at a physical location and manage check-ins at the door.",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      value: "online",
      label: "Online",
      description: "Host event through any virtual platform and easily share the joining instructions only with the ticket buyers.",
      icon: <Globe className="h-4 w-4" />,
    },
  ];

  const eventTypeOptions: SelectOptionType[] = [
    {
      value: "workshop",
      label: "Workshop",
      description: "Host event at a physical location and manage check-ins at the door.",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      value: "conference",
      label: "Conference",
      description: "Host event through any virtual platform and easily share the joining instructions only with the ticket buyers.",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "seminar",
      label: "Seminar",
      description: "Host event through any virtual platform and easily share the joining instructions only with the ticket buyers.",
      icon: <Globe className="h-4 w-4" />,
    },
  ];

  // Custom SelectValue component
  const CustomSelectValue = ({ value, options }: { value: string; options: SelectOptionType[] }) => {
    const selected = options.find(option => option.value === value);
    if (!selected) return null;
    
    return (
      <div className="flex items-center gap-2">
        {selected.icon}
        <div className="truncate">
          <span className="font-medium">{selected.label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen mt-16 bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-8">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <form className="space-y-8">
              <h1 className="text-2xl font-bold">Create Event</h1>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input id="eventTitle" placeholder="Enter the name of your event" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date and Time</Label>
                  <Input id="startDate" type="datetime-local" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date and Time</Label>
                  <Input id="endDate" type="datetime-local" />
                </div>

                <div className="space-y-2">
                  <Label>Event Setting</Label>
                  <Select value={eventSetting} onValueChange={setEventSetting}>
                    <SelectTrigger className="w-full">
                      {eventSetting ? (
                        <CustomSelectValue value={eventSetting} options={eventSettingOptions} />
                      ) : (
                        <SelectValue placeholder="Please select an option" />
                      )}
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {eventSettingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="py-3">
                          <div className="flex items-start gap-2">
                            {option.icon}
                            <div className="flex-1">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground whitespace-normal">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger className="w-full">
                      {selectedEventType ? (
                        <CustomSelectValue value={selectedEventType} options={eventTypeOptions} />
                      ) : (
                        <SelectValue placeholder="Please select an option" />
                      )}
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {eventTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="py-3">
                          <div className="flex items-start gap-2">
                            {option.icon}
                            <div className="flex-1">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground whitespace-normal">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {eventSetting === "venue" && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Event Description</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="eventImage">Event Image</Label>
                  <Input 
                    id="eventImage" 
                    type="file" 
                    className="cursor-pointer file:bg-purple-50 file:text-purple-600 file:border-0 file:rounded-lg hover:file:bg-purple-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Type here..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit">
                Create Event
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Button, Input } from "..";
import {
  fetchAllPastHackathons,
  fetchAllUpcomingHackathons,
  fetchHackathonCities,
} from "@/middleware";
import { motion } from "framer-motion";
import { cn } from "@/helpers";
import { EmptyState } from "@/components/sections";
import { Laptop, MapPin } from "lucide-react";
import Link from "next/link";

// Hackathons > City action view
const HackathonCityActionView: React.FunctionComponent = () => {
  const [locations, setLocations] = useState<Array<string>>([]);
  const [filteredLocations, setFilteredLocations] = useState<Array<string>>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonCities();
      setLocations(data);
      setFilteredLocations(data);
    }
    fetchData();
  }, []);

  const handleSearchInput = () => {
    // Filter cities without mutating the main locations array
    const filteredCities = locations.filter((city) =>
      city.toLowerCase().includes(searchInput.toLowerCase()),
    );

    // Set the filtered cities in the state
    setFilteredLocations(filteredCities);

    // Set the search input in the state
    setSearchInput(searchInput);
  };

  useEffect(() => {
    handleSearchInput();
  }, [searchInput]);

  return (
    <div className="hackathon-city-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${locations.length} cities/locations`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search hackathons via any location..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredLocations.length ? (
        <div className="locations-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredLocations.map((location, index) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  top: 24 * index * 2,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  top: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                }}
                className="w-full"
                key={index}
              >
                <Button
                  variant={"solid"}
                  size="large"
                  className={cn(
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none",
                  )}
                  stretch
                >
                  {location}
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={MapPin}>Cities not found</EmptyState>
      )}
    </div>
  );
};

const PastHackathonsActionView: React.FunctionComponent = () => {
  const [pastHackathons, setPastHackathons] = useState<
    Array<{
      title: string;
      hackathonSlug: string;
    }>
  >([]);
  const [filteredPastHackathons, setFilteredPastHackathons] = useState<
    Array<{
      title: string;
      hackathonSlug: string;
    }>
  >([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllPastHackathons();
      setPastHackathons(data);
      setFilteredPastHackathons(data);
    }
    fetchData();
  }, []);

  const handleSearchInput = () => {
    const filteredPastHackathons = pastHackathons.filter((hackathon) =>
      hackathon.title.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setFilteredPastHackathons(filteredPastHackathons);
    setSearchInput(searchInput);
  };

  useEffect(() => {
    handleSearchInput();
  }, [searchInput]);

  return (
    <div className="hackathon-pastHackathons-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${pastHackathons.length} hackathons`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search for old hackathons..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredPastHackathons.length ? (
        <div className="locations-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredPastHackathons.map((hackathon, index) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  top: 24 * index * 2,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  top: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                }}
                className="w-full"
                key={index}
              >
                <Button
                  variant={"solid"}
                  size="large"
                  className={cn(
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none",
                  )}
                  stretch
                  asLink
                  href={`/hackathons/${hackathon.hackathonSlug}`}
                >
                  {hackathon.title}
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Laptop}>Past hackathons not found</EmptyState>
      )}
    </div>
  );
};

const UpcomingHackathonsActionView: React.FunctionComponent = () => {
  const [upcomingHackathons, setUpcomingHackathons] = useState<
    Array<{
      title: string;
      hackathonSlug: string;
    }>
  >([]);
  const [filteredUpcomingHackathons, setFilteredUpcomingHackathons] = useState<
    Array<{
      title: string;
      hackathonSlug: string;
    }>
  >([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllUpcomingHackathons();
      setUpcomingHackathons(data);
      setFilteredUpcomingHackathons(data);
    }
    fetchData();
  }, []);

  const handleSearchInput = () => {
    const filteredPastHackathons = upcomingHackathons.filter((hackathon) =>
      hackathon.title.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setFilteredUpcomingHackathons(filteredPastHackathons);
    setSearchInput(searchInput);
  };

  useEffect(() => {
    handleSearchInput();
  }, [searchInput]);

  return (
    <div className="hackathon-upcomingHackathons-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${upcomingHackathons.length} hackathons`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search for upcoming hackathons..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredUpcomingHackathons.length ? (
        <div className="locations-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredUpcomingHackathons.map((hackathon, index) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  top: 24 * index * 2,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  top: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                }}
                className="w-full"
                key={index}
              >
                <Button
                  variant={"solid"}
                  size="large"
                  className={cn(
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none",
                  )}
                  stretch
                  asLink
                  href={`/hackathons/${hackathon.hackathonSlug}`}
                >
                  {hackathon.title}
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Laptop}>Upcoming hackathons not found</EmptyState>
      )}
    </div>
  );
};

export {
  HackathonCityActionView,
  PastHackathonsActionView,
  UpcomingHackathonsActionView,
};

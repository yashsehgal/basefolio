import { useEffect, useState } from "react";
import { Button, Input } from "..";
import {
  fetchAllPastHackathons,
  fetchAllUpcomingHackathons,
  fetchBuildersByNames,
  fetchHackathonCities,
} from "@/middleware";
import { motion } from "framer-motion";
import { cn } from "@/helpers";
import { EmptyState } from "@/components/sections";
import { Laptop, MapPin, User, UserCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchBuildersByLocation, fetchBuildersCompanies } from "@/middleware/search-actions";

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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
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
        <div className="hackathons-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
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
        <div className="hackathons-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
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

// User filtering and searching based actions
const UserSearchByUsernameActionView: React.FunctionComponent = () => {
  const [users, setUsers] = useState<Array<{
    username: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    profileAvatar: string;
  }>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<{
    username: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    profileAvatar: string;
  }>>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const delay = 200;
    let timeoutId: NodeJS.Timeout;

    async function fetchBuilders() {
      const data = await fetchBuildersByNames(searchInput);
      setUsers(data);
      setFilteredUsers(data);
    }

    // Use debounce to delay the API call
    const debounceApiCall = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fetchBuilders(), delay);
    };

    // Call debounceApiCall when searchInput changes
    debounceApiCall();

    // Cleanup function to clear the timeout on component unmount or when searchInput changes
    return () => clearTimeout(timeoutId);
  }, [searchInput]);


  return (
    <div className="builders-search-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${users.length} builders`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search for builders by username..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredUsers.length ? (
        <div className="users-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredUsers.map((user, index) => {
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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
                  )}
                  stretch
                  asLink
                >
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={cn(
                        "builder-avatar-wrapper flex flex-row items-center justify-center",
                        "overflow-hidden w-16 h-16 rounded-xl",
                        !user.profileAvatar &&
                        "border border-dashed border-zinc-400 text-zinc-400",
                      )}
                    >
                      {user.profileAvatar && (
                        <Image
                          src={user.profileAvatar}
                          width={"240"}
                          height={"240"}
                          alt="profile-avatar"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      )}
                      {!user.profileAvatar && <UserCircle />}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span>{user.username}</span>
                      <span className="font-normal text-sm text-neutral-400">
                        {`${user.fullName.firstName} ${user.fullName.lastName || ""}`}
                      </span>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        !searchInput
          ? <EmptyState icon={User}>Start searching for builders</EmptyState>
          : <EmptyState icon={User}>No builders found with {`\'${searchInput}\'`}</EmptyState>
      )}
    </div>
  )
}

const UserSearchByLocationActionView: React.FunctionComponent = () => {
  const [users, setUsers] = useState<Array<{
    username: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    profileAvatar: string;
    city: string;
    country: string;
  }>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<{
    username: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    profileAvatar: string;
    city: string;
    country: string;
  }>>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const delay = 200;
    let timeoutId: NodeJS.Timeout;

    async function fetchBuilders() {
      const data = await fetchBuildersByLocation(searchInput);
      setUsers(data);
      setFilteredUsers(data);
    }

    // Use debounce to delay the API call
    const debounceApiCall = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fetchBuilders(), delay);
    };

    // Call debounceApiCall when searchInput changes
    debounceApiCall();

    // Cleanup function to clear the timeout on component unmount or when searchInput changes
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  return (
    <div className="builders-search-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${users.length} builders`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search for builders by location..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredUsers.length ? (
        <div className="users-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredUsers.map((user, index) => {
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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
                  )}
                  stretch
                  asLink
                >
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={cn(
                        "builder-avatar-wrapper flex flex-row items-center justify-center",
                        "overflow-hidden w-16 h-16 rounded-xl",
                        !user.profileAvatar &&
                        "border border-dashed border-zinc-400 text-zinc-400",
                      )}
                    >
                      {user.profileAvatar && (
                        <Image
                          src={user.profileAvatar}
                          width={"240"}
                          height={"240"}
                          alt="profile-avatar"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      )}
                      {!user.profileAvatar && <UserCircle />}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span>{user.username}</span>
                      <span className="font-normal text-sm text-neutral-400">
                        {`from, ${user.city}, ${user.country}`}
                      </span>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        !searchInput
          ? <EmptyState icon={User}>Start searching for builders</EmptyState>
          : <EmptyState icon={User}>No builders found with {`\'${searchInput}\'`}</EmptyState>
      )}
    </div>
  )
}

const UserSearchByCompanyActionView: React.FunctionComponent = () => {
  const [companies, setCompanies] = useState<Array<string>>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Array<string>>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBuildersCompanies();
      setCompanies(data);
      setFilteredCompanies(data);
    }
    fetchData();
  }, []);

  const handleSearchInput = () => {
    const filteredPastHackathons = companies.filter((company) =>
      company.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setFilteredCompanies(filteredPastHackathons);
    setSearchInput(searchInput);
  };

  useEffect(() => {
    handleSearchInput();
  }, [searchInput]);

  return (
    <div className="builders-searchByCompanies-action-view action-view h-full">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {`Found ${companies.length} companies`}
      </div>
      <Input
        className="p-6"
        type="text"
        placeholder="Search for builders by companies..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value as string)}
      />
      {filteredCompanies.length ? (
        <div className="users-list-wrapper grid grid-cols-1 gap-3 w-full overflow-y-scroll overflow-x-auto max-h-[300px] p-3">
          {filteredCompanies.map((company, index) => {
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
                    "justify-between p-6 bg-white focus:shadow-sm focus:scale-105 focus:outline-none focus:bg-neutral-800 focus:text-white hover:white",
                  )}
                  stretch
                  asLink
                >
                  {company}
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        !searchInput
          ? <EmptyState icon={User}>Start searching for builders via company names</EmptyState>
          : <EmptyState icon={User}>No builders found working at {`\'${searchInput}\'`}</EmptyState>
      )}
    </div>
  )
}

export {
  HackathonCityActionView,
  PastHackathonsActionView,
  UpcomingHackathonsActionView,
  UserSearchByUsernameActionView,
  UserSearchByLocationActionView,
  UserSearchByCompanyActionView
};

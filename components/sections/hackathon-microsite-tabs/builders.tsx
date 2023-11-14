"use client";
import { Section } from "@/components/layouts";
import { Button, CardContainer, Input } from "@/components/ui";
import { cn } from "@/helpers";
import { fetchBuildersForHackathon } from "@/middleware";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserCircle, BadgeCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BuilderRowCard } from "@/components/ui/builder-row-card";

const Builders = (hackathonData: HackathonInterface) => {
  const [builders, setBuilders] = useState<
    Array<BuilderInterface & { participationType?: "solo" | "team" }>
  >([]);

  const [searchInput, setSearchInput] = useState<string>("");

  const [filteredBuilders, setFilteredBuilders] = useState<
    Array<BuilderInterface & { participationType?: "solo" | "team" }>
  >([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchBuildersForHackathon(hackathonData.slug);
      setBuilders(data);
      setFilteredBuilders(data);
    }
    fetchData();
  }, []);

  const filterBuildersOnSearch = () => {
    const searchTermLowerCase = searchInput.toLowerCase().trim();

    const filteredResults = builders.filter((item) => {
      const username = item.username.toLowerCase();
      const firstName = item.fullName.firstName.toLowerCase();
      const location = item.location.toLowerCase();

      return (
        username.includes(searchTermLowerCase) ||
        firstName.includes(searchTermLowerCase) ||
        location.includes(searchTermLowerCase)
      );
    });

    setFilteredBuilders(filteredResults);
  };

  useEffect(() => {
    filterBuildersOnSearch();
  }, [searchInput]);

  return (
    <div id="builders-content-container">
      <Section className="border rounded-2xl px-8 max-md:p-0 max-md:border-none grid gap-6">
        <div className="builders-list-filter-actions-wrapper">
          <Input
            className={cn("p-4 rounded-xl placeholder:text-zinc-400")}
            placeholder="Search by username, full name, location, etc"
            onChange={(e) => {
              e.preventDefault();
              setSearchInput(e.target.value as string);
            }}
            value={searchInput}
          />
        </div>
        <div className="builders-list-container grid grid-cols-1 gap-4">
          {filteredBuilders.map((builder, index) => {
            return <BuilderRowCard {...builder} key={index} id={index} />;
          })}
        </div>
      </Section>
    </div>
  );
};

export { Builders };

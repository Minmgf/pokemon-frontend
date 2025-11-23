import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState<PokemonSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemon = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/pokemon?page=${pageNumber}`);
      const newPokemon = response.data;

      if (newPokemon.length === 0) {
        setHasMore(false);
      } else {
        setPokemon((prev) =>
          pageNumber === 1 ? newPokemon : [...prev, ...newPokemon]
        );
      }
    } catch (error) {
      console.error("Error fetching pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPokemon(nextPage);
    }
  };

  useEffect(() => {
    fetchPokemon(1);
  }, []);

  return {
    pokemon,
    loading,
    loadMore,
    hasMore,
    refresh: () => fetchPokemon(1),
  };
}

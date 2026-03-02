import { authFetch } from "./authFetch";

const BASE_URL = "";

const buildQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const getMatches = async (params = {}) => {
  const response = await authFetch(
    `${BASE_URL}/api/matches${buildQueryString(params)}`,
    { headers: { "Content-Type": "application/json" } },
  );
  return handleResponse(response);
};

export const getMatchById = async (id) => {
  const response = await authFetch(`${BASE_URL}/api/matches/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getMatchDetails = async (id) => {
  const response = await authFetch(`${BASE_URL}/api/matches/${id}/details`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getMatchesByStadium = async (stadiumId) => {
  const response = await authFetch(`${BASE_URL}/api/matches/stadium/${stadiumId}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getMatchDates = async () => {
  const response = await authFetch(`${BASE_URL}/api/matches/dates`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getMatchesByCompetition = async (
  competitionId,
  page = 0,
  size = 10,
) => {
  const response = await authFetch(
    `${BASE_URL}/api/matches/competition/${competitionId}?page=${page}&size=${size}`,
    { headers: { "Content-Type": "application/json" } },
  );
  return handleResponse(response);
};

export const getCompetitions = async (params = {}) => {
  const response = await authFetch(
    `${BASE_URL}/api/competitions${buildQueryString(params)}`,
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return handleResponse(response);
  }

  const fallbackResponse = await authFetch(
    `${BASE_URL}/api/competition${buildQueryString(params)}`,
    { headers: { "Content-Type": "application/json" } },
  );
  return handleResponse(fallbackResponse);
};

export const getCompetitionById = async (id) => {
  const response = await authFetch(`${BASE_URL}/api/competition/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    return handleResponse(response);
  }

  const fallbackResponse = await authFetch(`${BASE_URL}/api/competitions/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(fallbackResponse);
};

export const getTeamById = async (id) => {
  const response = await authFetch(`${BASE_URL}/api/teams/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

export const getStadiumById = async (id) => {
  const response = await authFetch(`${BASE_URL}/api/stadiums/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};

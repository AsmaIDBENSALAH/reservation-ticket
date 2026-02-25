import { getAuthHeader } from "./authHeader";

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

const getRequestOptions = () => ({
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeader(),
  },
});

export const getMatches = async (params = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/matches${buildQueryString(params)}`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

export const getMatchById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/matches/${id}`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

export const getMatchDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/matches/${id}/details`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

export const getMatchesByStadium = async (stadiumId) => {
  const response = await fetch(
    `${BASE_URL}/api/matches/stadium/${stadiumId}`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

export const getMatchDates = async () => {
  const response = await fetch(`${BASE_URL}/api/matches/dates`, getRequestOptions());
  return handleResponse(response);
};

export const getMatchesByCompetition = async (
  competitionId,
  page = 0,
  size = 10,
) => {
  const response = await fetch(
    `${BASE_URL}/api/matches/competition/${competitionId}?page=${page}&size=${size}`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

export const getCompetitions = async (params = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/competitions${buildQueryString(params)}`,
    getRequestOptions(),
  );

  if (response.ok) {
    return handleResponse(response);
  }

  const fallbackResponse = await fetch(
    `${BASE_URL}/api/competition${buildQueryString(params)}`,
    getRequestOptions(),
  );
  return handleResponse(fallbackResponse);
};

export const getCompetitionById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/competition/${id}`,
    getRequestOptions(),
  );

  if (response.ok) {
    return handleResponse(response);
  }

  const fallbackResponse = await fetch(
    `${BASE_URL}/api/competitions/${id}`,
    getRequestOptions(),
  );
  return handleResponse(fallbackResponse);
};

export const getTeamById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/teams/${id}`, getRequestOptions());
  return handleResponse(response);
};

export const getStadiumById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/stadiums/${id}`,
    getRequestOptions(),
  );
  return handleResponse(response);
};

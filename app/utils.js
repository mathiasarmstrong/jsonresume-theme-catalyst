import {DateTime} from "luxon";

export const formatDate = date => DateTime.fromFormat(date, 'MM/YYYY');

export const removeProtocol = url => {
  const cleaned = url.replace(/(^\w+:|^)\/\//, '');
  console.log(`cleaning protocol from URL: ${cleaned}`)
  return cleaned
}

export const groupLangByFluency = (languages) => {
  return languages.reduce((result, lang) => {
    const group = lang.fluency || lang.level;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(lang);

    if (result === -1) {
      throw new ('Error with fluency mappings')
    }
    return result;
  }, {});
}

export const SKILL_RANK_FLUENCY_MAPPING = ['Legacy', 'Experimenting', 'Adept', 'Advanced', 'Expert']
export const SKILL_COLOR_RANK_MAPPING = ['#5bc0eb', '#5bc0eb', '#8f2d56', '#c4412a', '#ffb400']

export const getFluencyRanking = fluencyLevel => SKILL_RANK_FLUENCY_MAPPING.map(
    (a) => a.toLowerCase()
  ).findIndex(
    (a) => fluencyLevel.toLowerCase() === a
  )

export const getStarsForLangFluency = fluencyLevel => {
  const starIdx = getFluencyRanking(fluencyLevel)
  return SKILL_RANK_FLUENCY_MAPPING.slice(0, starIdx + 1)
}

export const getFluencyColor = fluencyLevel => {
  const starIdx = getFluencyRanking(fluencyLevel)
  return SKILL_COLOR_RANK_MAPPING[starIdx]
}

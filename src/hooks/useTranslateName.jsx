import translate from "../static/lang_list.json";
import _ from "lodash";

export const translateName = (id, lang) => {
  let ko_name = _.find(translate, function (friend) {
    return (
      parseInt(friend.pokemon_species_id) === parseInt(id) &&
      friend.local_language_id === lang
    );
  });

  return ko_name?.name;
};

export const FindGenus = (id, lang) => {
  let ko_name = _.find(translate, function (friend) {
    return (
      parseInt(friend.pokemon_species_id) === parseInt(id) &&
      friend.local_language_id === lang
    );
  });

  return ko_name?.genus;
};
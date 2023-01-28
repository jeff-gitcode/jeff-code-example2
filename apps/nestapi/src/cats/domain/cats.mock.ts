import { Cat } from './cat.dto';

const cat0: Cat = {
  id: '1',
  name: 'Breed1',
  child_friendly: 3,
  dog_friendly: 5,
  stranger_friendly: 3,
};

const cat1: Cat = {
  id: '2',
  name: 'Breed2',
  child_friendly: 3,
  dog_friendly: 1,
  stranger_friendly: 1,
};

const cat2: Cat = {
  id: '3',
  name: 'Breed3',
  child_friendly: 2,
  dog_friendly: 5,
  stranger_friendly: 3,
};

const cat3: Cat = {
  id: '4',
  name: 'Breed4',
  child_friendly: 3,
  dog_friendly: 4,
  stranger_friendly: 3,
};

const cat4: Cat = {
  id: '5',
  name: 'Breed5',
  child_friendly: 1,
  dog_friendly: 2,
  stranger_friendly: 3,
};

const cat5: Cat = {
  id: '6',
  name: 'Breed6',
  child_friendly: 3,
  dog_friendly: 2,
  stranger_friendly: 3,
};

const cat6: Cat = {
  id: '7',
  name: 'Breed7',
  child_friendly: 3,
  dog_friendly: 3,
  stranger_friendly: 3,
};

const cat7: Cat = {
  id: '8',
  name: 'Breed8',
  child_friendly: 2,
  dog_friendly: 2,
  stranger_friendly: 1,
};

const cat8: Cat = {
  id: '9',
  name: 'Breed9',
  child_friendly: 3,
  dog_friendly: 1,
  stranger_friendly: 4,
};

const cat9: Cat = {
  id: '10',
  name: 'Breed10',
  child_friendly: 4,
  dog_friendly: 5,
  stranger_friendly: 1,
};

const cats: Cat[] = [
  cat0,
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
];

const top5Breeds: Cat[] = [cat1, cat7, cat4, cat5, cat8];

export { cat0, cats, top5Breeds };

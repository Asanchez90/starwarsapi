import './Navbar.css';
import { Button } from '../Button/Button';

export const Navbar = () => {
  return `
    <nav>
        ${Button('CharacteresBtn', 'Characteres')}
        ${Button('CreaturesBtn', 'Creatures')}
        ${Button('droidsBtn', 'DroidsBtn')}
        
        ${Button('OrganizationsBtn', 'Organizations')}
        ${Button('SpeciesBtn', 'Species')}
        ${Button('VehiculesBtn', 'Vehicules')}
    </nav> `;
};

// ${Button('Locationsbtn', 'Locations')} tengo problemas al importarlo porque es locations/
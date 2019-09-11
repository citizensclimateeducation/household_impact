import React, { useState, useEffect } from 'react';
import { nextAndInvisible } from '../lib/Utility.js';
import SinglePersonIcon from './images/icon-single.svg';
import FamilyIcon from './images/icon-family.svg';
import HousemateIcon from './images/icon-housemates.svg';

function LivingSituation({ setAttribute }) {
  const [selectedIcon, setIcon] = useState('family');

  // toggling living situations sets these defaults for the family panel
  const living_situation = {
    single: { adults: 1, children: 0, other_residents: 0 },
    housemates: { adults: 1, children: 0, other_residents: 2 },
    family: { adults: 2, children: 2, other_residents: 0 },
    shared_family: { adults: 2, children: 2, other_residents: 2 },
  };

  const selectIcon = icon => {
    setIcon(icon);
    Object.entries(living_situation[icon]).forEach(([key, value]) =>
      setAttribute({ target: { name: key, value: value } }),
    );
  };

  return (
    <div id="living_situation" className="ccl_card input initially_hidden">
      <div className="living_situation_panel">
        <div className="family_info_panel section">
          <div className="form_title no_print">Describe your living situation</div>

          <div className="living_situation_tiles">
            <div
              className={`living_situation_tile ${selectedIcon === 'single' ? 'selected' : ''}`}
              onClick={e => selectIcon('single')}
            >
              <div className="living_situation_icon single_icon">
                <SinglePersonIcon />
              </div>
              <div>I live alone</div>
            </div>
            <div
              className={`living_situation_tile ${selectedIcon === 'housemates' ? 'selected' : ''}`}
              onClick={e => selectIcon('housemates')}
            >
              <div className="duel_icon">
                <div className="living_situation_icon single_icon">
                  <SinglePersonIcon />
                </div>
                <div className="situation_plus">+</div>
                <div className="living_situation_icon">
                  <HousemateIcon />
                </div>
              </div>
              <div>I live with housemates</div>
            </div>
            <div
              className={`living_situation_tile ${selectedIcon === 'family' ? 'selected' : ''}`}
              onClick={e => selectIcon('family')}
            >
              <div className="living_situation_icon">
                <FamilyIcon />
              </div>
              <div>I live with my family</div>
            </div>
            <div
              className={`living_situation_tile ${selectedIcon === 'shared_family' ? 'selected' : ''}`}
              onClick={e => selectIcon('shared_family')}
            >
              <div className="duel_icon">
                <div className="living_situation_icon">
                  <FamilyIcon />
                </div>
                <div className="situation_plus">+</div>
                <div className="living_situation_icon  housemate_family_icon">
                  <FamilyIcon />
                </div>
              </div>
              <div>My family lives with housemates</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer text-center">
        <button
          href="#basic_questions"
          className="btn btn-default btn-intro"
          id="btn_living_situation_next"
          onClick={e => {
            nextAndInvisible(e, '#basic_questions');
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LivingSituation;

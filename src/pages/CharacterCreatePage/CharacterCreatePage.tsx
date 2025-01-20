import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Header from "../../components/Header/Header";
import "./CharacterCreatePage.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";

const CharacterCreatePage: FunctionalComponent = () => {
  const [systemName, setSystemName] = useState<string>("System Name");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<any>({
    characterName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    originNationality: "",
    profession: "",
    category: "",
    primaryCategory: "Attributes",
    secondaryCategory: "Experience",
    tertiaryCategory: "Advantages",
    strength: 3,
    health: 3,
    agility: 3,
    dexterity: 3,
    perception: 3,
    intelligence: 3,
    empathy: 3,
    will: 3,
    attributePoints: 0,
    experiencePoints: 0,
    advantagePoints: 0,
  });

  const characterTypeOptions = [
    { value: "mundane", label: "Mundane" },
    { value: "skilled", label: "Skilled" },
    { value: "exceptional", label: "Exceptional" },
    { value: "heroic", label: "Heroic" },
    { value: "pulpAction", label: "Pulp Action" },
  ];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const system = query.get("system");
    if (system) {
      setSystemName(decodeURI(system));
    } else {
      console.warn("No system encoded in uri");
    }
  }, []);

  //stinky react for shiny style
  const handleSelectChange = (selectedOption: { value: string }) => {
    setFormData({ ...formData, characterType: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={"chrselHeader"}>
        <Header url={`/character-select/?system=${systemName}`} />
        <h1>Creating {systemName} character</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {currentPage === 1 && (
            <div className={"form-basic"}>
              <h2>Character Details</h2>
              <div className={"form-basic__input--text"}>
                <label>{"Name:"}</label>
                <input
                  type="text"
                  value={formData.characterName}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      characterName: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Age:"}</label>
                <input
                  type="text"
                  value={formData.age}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      age: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Gender:"}</label>
                <input
                  type="text"
                  value={formData.gender}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Height:"}</label>
                <input
                  type="text"
                  value={formData.height}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      height: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Weight:"}</label>
                <input
                  type="text"
                  value={formData.weight}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      weight: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Origin Nationality:"}</label>
                <input
                  type="text"
                  value={formData.originNationality}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      originNationality: e.currentTarget.value,
                    })
                  }
                />
              </div>

              <div className={"form-basic__input--text"}>
                <label>{"Profession:"}</label>
                <input
                  type="text"
                  value={formData.profession}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      profession: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <button
                className={"button-next"}
                type="button"
                onClick={goToNextPage}
              >
                {" "}
                Next <ArrowForwardIcon />{" "}
              </button>
            </div>
          )}

          {currentPage === 2 && (
            <div className={"form-basic"}>
              <h2> Select type of character </h2>
              <div className={"form-basic__input--text"}>
                <label htmlFor={"characterType"}>Character Type:</label>
                <Select
                  id="characterType"
                  options={characterTypeOptions}
                  onChange={handleSelectChange}
                  value={characterTypeOptions.find(
                    (option) => option.value === formData.characterType,
                  )}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "#191724",
                      borderColor: "#26233a",
                      borderRadius: "0.5rem",
                      color: "#e0def4",
                      fontSize: "1rem",
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor: "#26233a",
                      color: " #e0def4",
                      padding: "0.5rem",
                    }),
                  }}
                />
              </div>
              <div className={"button-group"}>
                <button
                  className={"button-next"}
                  type="button"
                  onClick={goToPreviousPage}
                >
                  {" "}
                  <ArrowBackIcon />
                  Back{" "}
                </button>
                <button
                  className={"button-next"}
                  type="button"
                  onClick={goToNextPage}
                >
                  {" "}
                  Next <ArrowForwardIcon />{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CharacterCreatePage;

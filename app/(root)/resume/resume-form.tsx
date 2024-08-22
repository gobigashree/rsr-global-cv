"use client";
import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  FieldValues,
} from "react-hook-form";
import Preview from "./preview";
import PreviewPdf from "./preview-pdf-new";
import ImageUploader from "@/components/image/image_uploader";
import StepperComponent from "@/components/stepper/dynamic";
import PersonalInformation from "./forms/personalinformation";
import WorkExperience from "./forms/workexperience";
import Education from "./forms/education";
import Training from "./forms/additional";
import { Award } from "lucide-react";
import AddSection from "./add-section";

type FormValues = {
  firstName: string;
  lastName: string;
  dob: Date;
  nationality: string;
  gender: string;
  experience: number;
  add1: string;
  add2: string;
  about: string;
  email: string;
  workemail: string;
  code: string;
  city: string;
  country: string;
  position: string;
  companyName: string;
  workfrom: string;
  workto: String;
  location: string;
  workabout: string;
  workwebsite: string;
  workdepartment: String;
  workaddress: string;
  jobappliedfor: string;
  education: {
    qualification: string;
    organisation: string;
    educationfrom: string;
    educationto: string;
    educationcity: string;
    educationcountry: string;
  }[];

  experiences: {
    years: number;
    description: string;
    workfrom: string;
    workto: String;
    companyName: string;
    aboutcompany: string;
    about2: string;
    position: string;
    location: string;
    workwebsite: string;
    workdepartment: String;
    workaddress: string;
  }[];
  training: {
    Hobbies: string;
    institute: string;
    trainingfrom: string;
    trainingto: string;
    traininglocation: string;
    trainingskills: string;
  }[];
};


const Resume = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    getValues,
    trigger,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      // dob: '',
      experience: 0,
      companyName: "",
      experiences: [
        {
          workfrom: undefined,
          workto: undefined,
          companyName: undefined,
          aboutcompany: undefined,
          about2: undefined,
          position: undefined,
          location: undefined,
          workwebsite: undefined,
          workdepartment: undefined,
          workaddress: undefined,
        },
      ],
      education: [
        {
          qualification: undefined,
          organisation: undefined,
          educationfrom: undefined,
          educationto: undefined,
          educationcity: undefined,
          educationcountry: undefined,
        },
      ],
      training: [
        {
          Hobbies: undefined,
          institute: undefined,
          trainingfrom: undefined,
          trainingto: undefined,
          traininglocation: undefined,
          trainingskills: undefined,
        },
      ],
    },
  });

const [section,setSection] =useState(false)

const handleSection = () =>{
  setSection(true)
}

  const [selectedSection, setSelectedSection] = useState([]);

  const [showPreview, setShowPreview] = useState(false);

  const [show, setShow] = useState(0);

  const [data, setData] = useState({
    personalInformation:null,
    workExperience:[],
    education:[],
    training:[]
  });


  const [showFields, setShowFields] = useState(true);

  //select options
  // const options = [
  //   { value: "", label: "Select an option" },
  //   // { value: "personal", label: "Personal information" },
  //   { value: "work", label: "Work Experience" },
  //   { value: "education", label: "Education and Training" },
  //   {label:'Language Skills'},
  //   {label:'Driving License'},
  //   { value: "additional", label: "Hobbies and Interests" },
  //   {label: 'Honors and Awards'},
  //   {label:'Others'},
  // ];

  const formComponents = {
    // "personal":<PersonalInformation setData={setData} personalInformation={data.personalInformation}/>,
  "work": <WorkExperience setData={setData} setShowPreview={setShowPreview} workExperience={data.workExperience} />, 
 "education":<Education setData={setData} setShowPreview={setShowPreview} education={data.education}/>, 
  "additional":<Training setData={setData} setShowPreview={setShowPreview} training={data.training}/>,
}

// const handleButtonClick = () => {
//   setShowPreview(!showPreview)
// }

 //home page

 const handleHome = () => {
  window.location.href='/'
}

  // handler for dropdown change
  
  const addSections = (sectionName) => {
    setSelectedSection((prevState)=>([...prevState,sectionName]));
  };

  //--validation function for date year range--

  const validateDateRange = (value) => {
    const minDate = new Date("1950-01-01");
    const maxDate = new Date("2100-12-31");
    const selectedDate = new Date(value);

    if (selectedDate < minDate || selectedDate > maxDate) {
      return "please enter valid Year";
    }
    return true;
  };

  //--validation for input field--

  const handleNext = async () => {
    // const isValid = await trigger();
    // if(isValid){
    setShow(show + 1);
    setSection(true);
  };
  // };

  const handlePrevious = () => {
    setShow(show - 1);
  };

  const handleReset = () => {
    setShow(0);
  };

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const [uploadedImage, setUploadedImage] = useState("");

  const handleImageChange = (imageurl) => {
    setUploadedImage(imageurl);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setData({ ...data, profileImage: uploadedImage });
    handleNext();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setShow(4);
    setShowPreview(true);
  };



  return (
    <div className="w-9/12 p-8 shadow-2xl  border-gray-300 text-justify mx-auto my-7">
      <StepperComponent step={show} />

  {show === 0 && (
        <div>
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div>

              <hr className="mb-2" />
              <PersonalInformation setData={setData} personalInformation={data.personalInformation} setShowPreview={setShowPreview} />
            </div>

            {/* {selectedSection === "work" && (
      <div>
        <WorkExperience setData={setData} workExperience={data.workExperience} />
      </div>
    )}
    {selectedSection === "education" && (
      <div>
        <Education setData={setData} education={data.education}/>
      </div>
    )}

    {selectedSection === "additional" && (
      <div>
        <Training setData={setData} training={data.training}/>
      </div>
    )} */}

            {selectedSection.map((selected) => (
              <div key={selected}>
                {formComponents[selected]}

              </div>
            ))}
          </div><div>
              {showPreview ? <AddSection addSections={addSections} setShowPreview={setShowPreview} showPreview={showPreview} selectedSection={selectedSection} /> : null}

            </div><div className="flex mx-6 my-10">
              <button
                type="button"
                className="w-24 items-center capitalize bg-white hover:bg-green-600 text-black p-2 hover:text-slate-100 font-bold rounded-md"
                onClick={handleHome}
              >
                Exit
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-24 items-center capitalize bg-green-600 hover:bg-green-500 text-white p-2  mx-10 font-bold rounded-md"
              >Next
              </button>
            </div>
            </div>
)} 

        <div>
          {show === 1 && (
            <div>
              <Preview
                data={data}
                handleNext={handleNext}
                image={uploadedImage}
              />
              {/* <button className='w-20 flex items-center capitalize bg-blue-600 text-white p-2' onClick={handleNext}>Next</button> */}
              <div className="flex">
                <button
                  type="button"
                  className="w-16 items-center capitalize bg-white hover:bg-green-600 text-black hover:text-slate-100 p-2 font-bold rounded-md"
                  onClick={handleReset}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="w-16 items-center capitalize bg-green-600 hover:bg-green-500 text-white p-2 mx-10 font-bold rounded-md"
                  onClick={handleNext}
                >
                  next
                </button>
              </div>
            </div>
          )}
        </div>


      {show === 2 && (
        <div>
          <PreviewPdf data={data} handleNext={handleNext} />
        </div>
      )}
    </div>
  );
};

export default Resume;

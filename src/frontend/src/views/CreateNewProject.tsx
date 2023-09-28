import StepSwitcher from '../components/common/StepSwitcher';
import CreateProjectHeader from '../components/createnewproject/CreateProjectHeader';
import React, { useEffect, useState } from 'react';
import { createProjectSteps } from '../constants/StepFormConstants';
import ProjectDetailsForm from '../components/createnewproject/ProjectDetailsForm';
import UploadArea from '../components/createnewproject/UploadArea';
import DataExtract from '../components/createnewproject/DataExtract';
import SplitTasks from '../components/createnewproject/SplitTasks';
import SelectForm from '../components/createnewproject/SelectForm';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CommonActions } from '.././store/slices/CommonSlice';

const CreateNewProject = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [geojsonFile, setGeojsonFile] = useState(null);
  const [customLineUpload, setCustomLineUpload] = useState(null);
  const [customPolygonUpload, setCustomPolygonUpload] = useState(null);

  useEffect(() => {
    switch (location.pathname) {
      case '/new-create-project':
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 1 }));
        break;
      case '/new-upload-area':
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 2 }));
        break;
      case '/new-select-form':
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 3 }));
        break;
      case '/new-data-extract':
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 4 }));
        break;
      case '/new-define-tasks':
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 5 }));
        break;
      default:
        dispatch(CommonActions.SetCurrentStepFormStep({ flag: 'create_project', step: 1 }));
        break;
    }
  }, [location.pathname]);

  const getCreateProjectContent = (): JSX.Element => {
    switch (location.pathname) {
      case '/new-create-project':
        return <ProjectDetailsForm flag="create_project" />;
      case '/new-upload-area':
        return <UploadArea flag="create_project" geojsonFile={geojsonFile} setGeojsonFile={setGeojsonFile} />;
      case '/new-select-form':
        return <SelectForm flag="create_project" />;
      case '/new-data-extract':
        return (
          <DataExtract
            flag="create_project"
            customLineUpload={customLineUpload}
            setCustomLineUpload={setCustomLineUpload}
            customPolygonUpload={customPolygonUpload}
            setCustomPolygonUpload={setCustomPolygonUpload}
          />
        );
      case '/new-define-tasks':
        return <SplitTasks flag="create_project" geojsonFile={geojsonFile} setGeojsonFile={setGeojsonFile} />;
      default:
        return <ProjectDetailsForm flag="create_project" />;
    }
  };
  return (
    <div>
      <CreateProjectHeader />
      <div className="fmtm-min-h-[72vh] fmtm-bg-gray-100 fmtm-box-border fmtm-border-[1px] fmtm-border-t-white fmtm-border-t-[0px]">
        <div className=" fmtm-w-full">
          <div>
            <StepSwitcher data={createProjectSteps} flag={'create_project'} />
          </div>
        </div>
        <div className="fmtm-mx-5 fmtm-mb-5">{(() => getCreateProjectContent())()}</div>
      </div>
    </div>
  );
};

export default CreateNewProject;

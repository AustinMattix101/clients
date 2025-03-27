import { useState } from 'react';
import {Alert, Button} from 'react-bootstrap';
import { IAlert } from '.';

export const ErrorAlertDismissible: React.FC<IAlert> = ({ data, statusCode }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible style={{width: 380, marginLeft: 56}}>
        <Alert.Heading>
          <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" viewBox="0 0 16 16" height={22} width={22}>
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>{data.error && <span>{data.status} {statusCode} ERROR!</span>}
        </Alert.Heading>
        <p className="error-message">
        <span>{data.error}</span>
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)} className="w-50 btn btn-outline-danger rounded-3" style={{marginLeft: 133}}>Show Error</Button>;
}


export const SuccessAlertDismissible: React.FC<IAlert> = ({ data }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible style={{width: 380, marginLeft: 56}}>
        <Alert.Heading>
          <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" viewBox="0 0 16 16" height={22} width={22}>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>{data.status} SUCCESS!
        </Alert.Heading>
        <p className="success-message">
        <span>{data.message}</span><br/>
        {(data.data.username || data.data.email) && <span>Profiles: </span>}
        {data.data.username && <span><br/>{`Username: ${data.data.username}`}</span>}
        {data.data.email && <span><br/>{`Email: ${data.data.email}`}</span>}
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)} className="w-50 btn btn-outline-success rounded-3" style={{marginLeft: 133}}>Show Success</Button>;

}
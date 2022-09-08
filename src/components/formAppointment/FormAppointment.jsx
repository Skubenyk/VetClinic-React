//*FormAppointment

// *Import base
import styles from './formAppointment.module.scss';
import classNames from 'classnames';

// *Import Formik libraries for creating forms
import { useFormik } from 'formik';

// *Import Yup libraries for validation forms
import * as Yup from 'yup';

const FormAppointment = ({ active, setActive }) => {
  //*Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      tel: '',
      text: '',
    },
    //*Validation
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Минимум 2 символова')
        .required('Обязательное поле!'),
      tel: Yup.number()
        .typeError('Неправильный номер телефона')
        .min(10, 'Минимум  10 символов')
        .required('Обязательное поле!'),
      text: Yup.string()
        .min(30, 'Минимум  30 символов')
        .required('Обязательное поле!'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      setTimeout(() => {
        setSubmitting(false);
        resetForm();
      }, 400);
    },
  });
  //*Sending data form
  fetch(
    'https://beetroot-solodkui.herokuapp.com/beetroot-solodkui/users/registration',
    {
      method: 'POST',
      headers: { Appointment: 'form appointment' },
      body: JSON.stringify(formik),
    }
  )
    .then((response) => response.json())
    .then((result) => console.log(result));
  return (
    <div
      //*Сonditions for switching styles in mode active
      className={
        active ? classNames(styles.modal, styles.active) : styles.modal
      }
      onClick={() => setActive(false)}
    >
      {/* Form */}
      <div className={styles.form}>
        <div className={styles.formWrapper}>
          <form action='#' method='post' onSubmit={formik.handleSubmit}>
            <div className={styles.conntainerForm}>
              {/* Title form */}
              <h2 className={styles.titleForm}>Запись на прием</h2>
              <div className={styles.formContent}>
                {/* Name */}
                <label htmlFor='name'></label>
                <input
                  className={styles.name}
                  type='text'
                  placeholder='Имя'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Conditions for including a style error */}
                {formik.errors.name && formik.touched.name ? (
                  <div className={styles.error}>{formik.errors.name}</div>
                ) : null}
                {/* Telephone */}
                <label htmlFor='tel'></label>
                <input
                  className={styles.tel}
                  type='tel'
                  placeholder='Телефон'
                  name='tel'
                  value={formik.values.tel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Conditions for including a style error */}
                {formik.errors.tel && formik.touched.tel ? (
                  <div className={styles.error}>{formik.errors.tel}</div>
                ) : null}
                {/* Text */}
                <label htmlFor='text'></label>
                <textarea
                  className={styles.formContentText}
                  rows='8'
                  placeholder='Кратко опишите проблему'
                  name='text'
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Conditions for including a style error */}
                {formik.errors.text && formik.touched.text ? (
                  <div className={styles.error}>{formik.errors.text}</div>
                ) : null}
              </div>
              {/* Buttons */}
              <div className={styles.formButton}>
                <button
                  className={styles.buttonSubmit}
                  type='submit'
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>ОТПРАВИТЬ</span>
                </button>
                <button
                  //*Close form
                  className={styles.buttonClose}
                  type='button'
                >
                  <span>ЗАКРЫТЬ</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAppointment;

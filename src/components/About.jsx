import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About LAPTOPIA</h1>
      <p className={styles.aboutSubtitle}>
        LAPTOPIA is a cutting-edge online marketplace designed to revolutionize the laptop sale and purchase experience. 
        The platform addresses the significant problem of fragmented information and overwhelming choices in the laptop market, 
        which can make decision-making cumbersome and inefficient for users. 
        By integrating an AI-powered recommendation system, LAPTOPIA provides personalized laptop suggestions based on user preferences, 
        budget, and usage requirements, ensuring informed purchasing decisions.
      </p>



      <div className={styles.team}>
        <h3 className={styles.teamTitle}>Meet Our Members</h3>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <img src="/images/waqar.jpg" alt="Waqar Asghar" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>Waqar Asghar</h3>
            <p className={styles.teamMemberRole}>Backend, API Handling & AI</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/images/ibrahim.jpg" alt="Muhammad Ibrahim Zarar" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>Muhammad Ibrahim Zarar</h3>
            <p className={styles.teamMemberRole}>UI/UX, Frontend & Firebase Auth</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/images/ashar.jpg" alt="Ashar Asfaq" className={styles.teamMemberImage} />
            <h3 className={styles.teamMemberName}>Ashar Asfaq</h3>
            <p className={styles.teamMemberRole}>Frontend & Documentation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

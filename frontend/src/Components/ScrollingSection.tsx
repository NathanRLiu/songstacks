
import styles from '../Styles/ScrollingSection.module.scss';

function ScrollingSection(props:{"sectionHeader": string, "direction": string}) {
	return (
		<div style={{display: "flex", flexDirection: "column", textAlign: "center", marginTop: "50px"}}>
			<h2 className={styles.sectionHeader}>{props.sectionHeader}</h2>
			<div className={styles.slider}>
				<div className={styles.slidetrack}>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
					<div className={styles[props.direction]}>
						
					</div>
				</div>
			</div>
		</div>
		
	)
}

export default ScrollingSection;
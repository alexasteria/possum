import React from 'react';
import {Gallery, Header, Placeholder, Banner, Panel, PanelHeader, Group, Div, MiniInfoCell} from "@vkontakte/vkui";
import './Home.css'
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader></PanelHeader>
		<Group header={<Header mode="secondary">Почему мы?</Header>}>
			<Div>
				<MiniInfoCell before={<Icon16Chevron/>}>У нас работают специалисты</MiniInfoCell>
				<MiniInfoCell textLevel={'primary'} before={<Icon16Chevron/>}>Более 5 лет успешной работы</MiniInfoCell>
				<MiniInfoCell textLevel={'primary'} before={<Icon16Chevron/>}>Более 1 000 покупателей</MiniInfoCell>
				<MiniInfoCell textLevel={'primary'} before={<Icon16Chevron/>}>Входим в ассоциации врачей</MiniInfoCell>
				<MiniInfoCell textLevel={'primary'} before={<Icon16Chevron/>}>Собственное производство</MiniInfoCell>
				<MiniInfoCell textLevel={'primary'} before={<Icon16Chevron/>}>Контроль качеств</MiniInfoCell>
			</Div>
		</Group>
		<Group header={<Header mode="secondary">Категории товаров</Header>}>
			<Banner
				mode="image"
				header="Ежи"
				asideMode={"expand"}
				subheader={'Все для ухода и содержания ежей. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Spike\'s World,  Hedgehogs and Friends и другие'}
				background={
					<div
						style={{
							backgroundColor: '#198662',
							backgroundImage: 'url(https://zoomagasin.ru/images/im-ej-logo.png)',
							backgroundPosition: 'right bottom',
							backgroundSize: 50,
							backgroundRepeat: 'no-repeat',
						}}
					/>
				}
			/>
			<Banner
				mode="image"
				header="Рептилии"
				asideMode={"expand"}
				subheader={'Все для ухода и содержания рептилий и амфибий. Профессиональные корма и диеты, лакомства, витамины и многое другое известных фирм ExoticMenu, Repashy, Nekton, Zoomed и другие'}
				background={
					<div
						style={{
							backgroundColor: '#198662',
							backgroundImage: 'url(https://zoomagasin.ru/images/im-rept-logo.png)',
							backgroundPosition: 'right bottom',
							backgroundSize: 50,
							backgroundRepeat: 'no-repeat',
						}}
					/>
				}
			/>
			<Banner
				mode="image"
				header="Насекомые"
				asideMode={"expand"}
				subheader={'Консервированные, сушеные и сублимированные насекомые, полноценные готовые к употреблению без консервантов. А так же корма и добавки для живых насекомых известных фирм производителей  ExoticMenu, Repashy, Nekton, Zoomed и другие'}
				background={
					<div
						style={{
							backgroundColor: '#198662',
							backgroundImage: 'url(https://zoomagasin.ru/images/im-nasek-logo.png)',
							backgroundPosition: 'right bottom',
							backgroundSize: 50,
							backgroundRepeat: 'no-repeat',
						}}
					/>
				}
			/>
			<Banner
				mode="image"
				header="Сахарный поссум"
				asideMode={"expand"}
				subheader={'Все для ухода и содержания сахарных поссумов. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Nekton и другие'}
				background={
					<div
						style={{
							backgroundColor: '#198662',
							backgroundImage: 'url(https://zoomagasin.ru/images/im-possum-logo.png)',
							backgroundPosition: 'right bottom',
							backgroundSize: 50,
							backgroundRepeat: 'no-repeat',
						}}
					/>
				}
			/>
			<Banner
				mode="image"
				header="Ежи"
				asideMode={"expand"}
				subheader={'Все для ухода и содержания насекомоядных животных, рыбок, различных птиц, лемуров, обезьянок и других. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Repashy, Nekton и другие'}
				background={
					<div
						style={{
							backgroundColor: '#198662',
							backgroundImage: 'url(https://zoomagasin.ru/images/im-drug-logo.png)',
							backgroundPosition: 'right bottom',
							backgroundSize: 50,
							backgroundRepeat: 'no-repeat',
						}}
					/>
				}
			/>
		</Group>
	</Panel>
);

export default Home;

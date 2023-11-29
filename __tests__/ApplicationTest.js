import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
	MissionUtils.Console.readLineAsync = jest.fn();

	MissionUtils.Console.readLineAsync.mockImplementation(() => {
		const input = inputs.shift();

		return Promise.resolve(input);
	});
};

const mockRandoms = (crewLists) => {
	MissionUtils.Random.shuffle = jest.fn();
	crewLists.reduce((acc, crewList) => {
		return acc.mockReturnValueOnce(crewList);
	}, MissionUtils.Random.shuffle);
};

const getLogSpy = () => {
	const logSpy = jest.spyOn(MissionUtils.Console, "print");
	logSpy.mockClear();
	return logSpy;
};

const runException = async (input) => {
	// given
	const logSpy = getLogSpy();

	const INPUT_TO_END = [
		"프론트엔드",
		"포비,준,왼손,리사,제이슨,워니,라이언,크롱,솔라",
		"숫자 야구 게임-4,자동차 경주-2,로또-4,크리스마스 프로모션-3",
	];
	mockRandoms([
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
	  ]);
	mockQuestions([input, ...INPUT_TO_END]);

	// when
	const app = new App();
	await app.play();

	// then
	expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
};

describe("팀 매칭 테스트", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});

	test("기능 테스트", async () => {
		// given
		const logSpy = getLogSpy();

		mockRandoms([
			[6, 8, 4, 3, 2, 1, 7, 5, 0],
			[1, 6, 7, 4, 8, 3, 5, 2, 0],
			[2, 1, 4, 7, 3, 6, 5, 8, 0],
			[7, 1, 0, 2, 5, 3, 8, 6, 4],
		]);
		mockQuestions([
			"프론트엔드",
			"포비,준,왼손,리사,제이슨,워니,라이언,크롱,솔라",
			"숫자 야구 게임-4,자동차 경주-2,로또-4,크리스마스 프로모션-3",
		]);

		// when
		const app = new App();
		await app.play();

		// then
		const logs = [
			"숫자 야구 게임",
			"라이언팀 - 라이언,리사,솔라,제이슨,포비",
			"왼손팀 - 왼손,워니,준,크롱",
			"자동차 경주",
			"라이언팀 - 라이언,준,포비",
			"제이슨팀 - 제이슨,크롱",
			"리사팀 - 리사,솔라",
			"왼손팀 - 왼손,워니",
			"로또",
			"왼손팀 - 왼손,제이슨,준,크롱,포비",
			"라이언팀 - 라이언,리사,솔라,워니",
			"크리스마스 프로모션",
			"준팀 - 준,크롱,포비",
			"리사팀 - 리사,왼손,워니",
			"라이언팀 - 라이언,솔라,제이슨",
		];

		logs.forEach((log) => {
			expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
		});
	});

	test("예외 테스트", async () => {
		await runException("프론트엔드,백엔드");
	});
});

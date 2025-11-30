import { Hono } from "hono";

const formatNumber = (num: number | string | undefined | null): string => {
	if (num === undefined || num === null) {
		return "0";
	}
	const value = typeof num === "string" ? Number.parseFloat(num) : num;
	if (Number.isNaN(value)) {
		return "0";
	}
	return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const formatDate = (dateStr: string | undefined | null): string => {
	if (!dateStr) {
		return "Not specified";
	}
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) {
		return "Invalid date";
	}
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});
};

const formatPercentage = (value: number | undefined | null): string => {
	if (value === undefined || value === null || Number.isNaN(value)) {
		return "0%";
	}
	return `${(value * 100).toFixed(1)}%`;
};


const polymarket = new Hono();

type MarketEvent = {
	slug: string;
	question: string;
	groupItemTitle: string;
	outcomes: string[];
	outcomePrices: string[];
	lastTradePrice: number;
	bestAsk: number;
	bestBid: number;
	spread: number;
	closed: boolean;
	archived: boolean;
};

type Market = {
	id: string;
	slug: string;
	question: string;
	outcomes: string;
	outcomePrices: string;
	volume: string;
	liquidity: string;
	volume24hr: string;
	volume1w: string;
	volume1mo: string;
	volume1yr: string;
};

type DetailedMarket = {
	id: string;
	question: string;
	conditionId: string;
	slug: string;
	resolutionSource: string;
	endDate: string;
	liquidity: string;
	startDate: string;
	image: string;
	icon: string;
	description: string;
	outcomes: string;
	outcomePrices: string;
	volume: string;
	active: boolean;
	closed: boolean;
	marketMakerAddress: string;
	createdAt: string;
	updatedAt: string;
	new: boolean;
	featured: boolean;
	submitted_by: string;
	archived: boolean;
	resolvedBy: string;
	restricted: boolean;
	groupItemTitle: string;
	groupItemThreshold: string;
	questionID: string;
	enableOrderBook: boolean;
	orderPriceMinTickSize: number;
	orderMinSize: number;
	umaResolutionStatus: string;
	volumeNum: number;
	liquidityNum: number;
	endDateIso: string;
	startDateIso: string;
	hasReviewedDates: boolean;
	volume24hr: number;
	volume1wk: number;
	volume1mo: number;
	volume1yr: number;
	clobTokenIds: string;
	umaBond: string;
	umaReward: string;
	volume24hrClob: number;
	volume1wkClob: number;
	volume1moClob: number;
	volume1yrClob: number;
	volumeClob: number;
	liquidityClob: number;
	acceptingOrders: boolean;
	negRisk: boolean;
	negRiskMarketID: string;
	negRiskRequestID: string;
	ready: boolean;
	funded: boolean;
	acceptingOrdersTimestamp: string;
	cyom: boolean;
	competitive: number;
	pagerDutyNotificationEnabled: boolean;
	approved: boolean;
	clobRewards: Array<{
		id: string;
		conditionId: string;
		assetAddress: string;
		rewardsAmount: number;
		rewardsDailyRate: number;
		startDate: string;
		endDate: string;
	}>;
	rewardsMinSize: number;
	rewardsMaxSpread: number;
	spread: number;
	oneDayPriceChange: number;
	oneWeekPriceChange: number;
	oneMonthPriceChange: number;
	lastTradePrice: number;
	bestBid: number;
	bestAsk: number;
	automaticallyActive: boolean;
	clearBookOnStart: boolean;
	manualActivation: boolean;
	negRiskOther: boolean;
	umaResolutionStatuses: string;
	pendingDeployment: boolean;
	deploying: boolean;
	rfqEnabled: boolean;
};

type Event = {
	id: string;
	url: string;
	title: string;
	slug: string;
	closed: boolean;
	startDate: string;
	endDate: string;
	markets: MarketEvent[];
	ended: boolean;
};

type Tag = {
	id: string;
	label: string;
	slug: string;
	event_count: number;
};

type DetailedEvent = {
	id: string;
	ticker: string;
	slug: string;
	title: string;
	description: string;
	resolutionSource: string;
	startDate: string;
	creationDate: string;
	endDate: string;
	image: string;
	icon: string;
	active: boolean;
	closed: boolean;
	archived: boolean;
	new: boolean;
	featured: boolean;
	restricted: boolean;
	liquidity: number;
	volume: number;
	openInterest: number;
	sortBy: string;
	createdAt: string;
	updatedAt: string;
	competitive: number;
	volume24hr: number;
	volume1wk: number;
	volume1mo: number;
	volume1yr: number;
	enableOrderBook: boolean;
	liquidityClob: number;
	negRisk: boolean;
	negRiskMarketID: string;
	commentCount: number;
	markets: Array<{
		id: string;
		question: string;
		conditionId: string;
		slug: string;
		resolutionSource: string;
		endDate: string;
		liquidity: string;
		startDate: string;
		image: string;
		icon: string;
		description: string;
		outcomes: string;
		outcomePrices: string;
		volume: string;
		active: boolean;
		closed: boolean;
		marketMakerAddress: string;
		createdAt: string;
		updatedAt: string;
		new: boolean;
		featured: boolean;
		submitted_by: string;
		archived: boolean;
		resolvedBy: string;
		restricted: boolean;
		groupItemTitle: string;
		groupItemThreshold: string;
		questionID: string;
		enableOrderBook: boolean;
		orderPriceMinTickSize: number;
		orderMinSize: number;
		volumeNum: number;
		liquidityNum: number;
		endDateIso: string;
		startDateIso: string;
		hasReviewedDates: boolean;
		volume24hr: number;
		volume1wk: number;
		volume1mo: number;
		volume1yr: number;
		clobTokenIds: string;
		umaBond: string;
		umaReward: string;
		volume24hrClob: number;
		volume1wkClob: number;
		volume1moClob: number;
		volume1yrClob: number;
		volumeClob: number;
		liquidityClob: number;
		acceptingOrders: boolean;
		negRisk: boolean;
		negRiskMarketID: string;
		negRiskRequestID: string;
		ready: boolean;
		funded: boolean;
		acceptingOrdersTimestamp: string;
		cyom: boolean;
		competitive: number;
		pagerDutyNotificationEnabled: boolean;
		approved: boolean;
		clobRewards?: Array<{
			id: string;
			conditionId: string;
			assetAddress: string;
			rewardsAmount: number;
			rewardsDailyRate: number;
			startDate: string;
			endDate: string;
		}>;
		rewardsMinSize: number;
		rewardsMaxSpread: number;
		spread: number;
		oneDayPriceChange?: number;
		oneHourPriceChange?: number;
		oneWeekPriceChange?: number;
		oneMonthPriceChange?: number;
		lastTradePrice: number;
		bestBid: number;
		bestAsk: number;
		automaticallyActive: boolean;
		clearBookOnStart: boolean;
		seriesColor: string;
		showGmpSeries: boolean;
		showGmpOutcome: boolean;
		manualActivation: boolean;
		negRiskOther: boolean;
		umaResolutionStatuses: string;
		pendingDeployment: boolean;
		deploying: boolean;
		rfqEnabled: boolean;
	}>;
	tags: Array<{
		id: string;
		label: string;
		slug: string;
		createdAt?: string;
		forceShow?: boolean;
		publishedAt?: string;
		updatedBy?: number;
		updatedAt?: string;
		forceHide?: boolean;
	}>;
	cyom: boolean;
	showAllOutcomes: boolean;
	showMarketImages: boolean;
	enableNegRisk: boolean;
	automaticallyActive: boolean;
	gmpChartMode: string;
	negRiskAugmented: boolean;
	pendingDeployment: boolean;
	deploying: boolean;
};

type PriceHistoryResponse = {
	history: Array<{
		t: number;
		p: number;
	}>;
};

type TrendingTag = {
	id: string;
	label: string;
	slug: string;
	forceShow?: boolean;
	forceHide?: boolean;
	publishedAt?: string;
	updatedBy?: number;
	createdAt: string;
	updatedAt?: string;
};

type CommentProfile = {
	name?: string;
	pseudonym: string;
	displayUsernamePublic: boolean;
	bio?: string;
	proxyWallet: string;
	baseAddress: string;
	profileImage?: string;
	positions?: Array<{
		tokenId: string;
		positionSize: string;
	}>;
};

type CommentReaction = {
	id: string;
	commentID: number;
	reactionType: string;
	userAddress: string;
	profile: {
		proxyWallet: string;
	};
};

type Comment = {
	id: string;
	body: string;
	parentEntityType: string;
	parentEntityID: number;
	parentCommentID?: string;
	userAddress: string;
	replyAddress?: string;
	createdAt: string;
	updatedAt: string;
	profile: CommentProfile;
	reactions?: CommentReaction[];
	reportCount: number;
	reactionCount: number;
};

const parseClobTokenIds = (
	clobTokenIds: string,
): { yes?: string; no?: string } => {
	try {
		const parsed = JSON.parse(clobTokenIds) as string[];
		return {
			yes: parsed[0],
			no: parsed[1],
		};
	} catch {
		return {};
	}
};

polymarket.get("/search_events", async (c) => {
	const { query, status } = c.req.query();

	const response = await fetch(
		`https://gamma-api.polymarket.com/public-search?q=${query}&limit_per_type=20&type=events`,
	);

	const data = (await response.json()) as {
		events: Event[];
		tags: Tag[];
		hasMore: boolean;
	};

	return c.json(
		data.events.map((event) => ({
			id: event.id,
			title: event.title,
			active: !event.closed,
			markets: event.markets
				.map(
					(market) =>
						`${market.slug}: ${market?.outcomes}`,
				)
				.join("\n"),
			startDate: event.startDate,
			endDate: event.endDate,
		})),
	);
});

polymarket.get("/search_tags", async (c) => {
	const { query } = c.req.query();

	const response = await fetch(
		`https://gamma-api.polymarket.com/public-search?q=${query}&optimized=true&limit_per_type=10&search_tags=true&cache=true`,
	);
	const data = (await response.json()) as {
		tags: Tag[];
	};

	return c.json(
		data.tags.map((tag) => ({
			id: tag.id,
			label: tag.label,
			slug: tag.slug,
			event_count: tag.event_count,
		})),
	);
});

polymarket.get("/top_events", async (c) => {
	const { limit, active, tag } = c.req.query();
	const isActive = active === "true" || active === true;
	const response = await fetch(
		`https://gamma-api.polymarket.com/events?active=${isActive}&closed=${!isActive}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0${tag ? `&tag_slug=${tag}` : ""}`,
	);
	const data = (await response.json()) as (Event & {
		volume: number;
		liquidity: number;
		volume24hr: number;
		volume1w: number;
		volume1mo: number;
		volume1yr: number;
	})[];

	return c.json(
		data.map((event) => ({
			title: event.title,
			volume: event.volume,
			liquidity: event.liquidity,
			volume24hr: event.volume24hr,
			volume1w: event.volume1w,
			volume1mo: event.volume1mo,
			volume1yr: event.volume1yr,
			startDate: event.startDate,
			endDate: event.endDate,
			active: !event.closed,
			id: event.id,
			markets: event.markets
				.map(
					(market) =>
						`${market.slug}: ${Array.isArray(market.outcomes) ? market.outcomes.map((outcome, i) => `${outcome}(${market.outcomePrices[i]})`).join("/") : ""}`,
				)
				.join("\n"),
		})),
	);
});

polymarket.get("/top_markets", async (c) => {
	const { limit, status, tag } = c.req.query();
	const response = await fetch(
		`https://gamma-api.polymarket.com/markets?active=${status === "active"}&closed=${status === "resolved"}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0${tag ? `&tag_slug=${tag}` : ""}`,
	);
	const data = (await response.json()) as Market[];

	return c.json(
		data.map((market) => ({
			id: market.id,
			question: market.question,
			volume: market.volume,
			liquidity: market.liquidity,
			volume24hr: market.volume24hr,
			volume1w: market.volume1w,
			volume1mo: market.volume1mo,
			volume1yr: market.volume1yr,
		})),
	);
});

polymarket.get("/market_details", async (c) => {
	const { id } = c.req.query();

	const response = await fetch(
		`https://gamma-api.polymarket.com/markets/${id}`,
	);

	if (!response.ok) {
		return c.json({ error: "Market not found" }, 404);
	}

	const market = (await response.json()) as DetailedMarket;

	const outcomes = JSON.parse(market.outcomes) as string[];
	const prices = JSON.parse(market.outcomePrices) as string[];
	const tokenIds = parseClobTokenIds(market.clobTokenIds);

	const markdown = `# ${market.question}

## Market Overview
- **Market ID**: ${market.id}
- **Status**: ${market.active ? "🟢 Active" : "🔴 Closed"}
- **Category**: ${market.groupItemTitle}
- **Created**: ${formatDate(market.createdAt)}
- **End Date**: ${formatDate(market.endDate)}

## Description
${market.description}

## Current Prices
${outcomes.map((outcome, i) => `- **${outcome}**: ${(Number.parseFloat(prices[i]) * 100).toFixed(1)}%`).join("\n")}

## Token IDs
${tokenIds.yes ? `- **Yes Token ID**: ${tokenIds.yes}` : ""}
${tokenIds.no ? `- **No Token ID**: ${tokenIds.no}` : ""}

## Trading Information
- **Last Trade Price**: ${(market.lastTradePrice * 100).toFixed(1)}%
- **Best Bid**: ${(market.bestBid * 100).toFixed(1)}%
- **Best Ask**: ${(market.bestAsk * 100).toFixed(1)}%
- **Spread**: ${(market.spread * 100).toFixed(2)}%

## Volume & Liquidity
- **Total Volume**: $${formatNumber(market.volumeNum)}
- **24h Volume**: $${formatNumber(market.volume24hr)}
- **7d Volume**: $${formatNumber(market.volume1wk)}
- **30d Volume**: $${formatNumber(market.volume1mo)}
- **Liquidity**: $${formatNumber(market.liquidityNum)}

## Price Changes
- **24h Change**: ${market.oneDayPriceChange >= 0 ? "+" : ""}${(market.oneDayPriceChange * 100).toFixed(2)}%
- **7d Change**: ${market.oneWeekPriceChange >= 0 ? "+" : ""}${(market.oneWeekPriceChange * 100).toFixed(2)}%
- **30d Change**: ${market.oneMonthPriceChange >= 0 ? "+" : ""}${(market.oneMonthPriceChange * 100).toFixed(2)}%

## Market Details
- **Resolution Source**: ${market.resolutionSource || "Not specified"}
- **UMA Resolution Status**: ${market.umaResolutionStatus}
- **Order Book Enabled**: ${market.enableOrderBook ? "Yes" : "No"}
- **Accepting Orders**: ${market.acceptingOrders ? "Yes" : "No"}
- **Min Order Size**: ${market.orderMinSize}
- **Price Tick Size**: ${market.orderPriceMinTickSize}

## Links
- **Polymarket URL**: https://polymarket.com/event/${market.slug}
- **Market Image**: ${market.image}`;

	c.header("Content-Type", "text/markdown");
	return c.text(markdown);
});

polymarket.get("/event_details", async (c) => {
	const { id } = c.req.query();

	const response = await fetch(`https://gamma-api.polymarket.com/events/${id}`);

	if (!response.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await response.json()) as DetailedEvent;

	const sortedMarkets = [...event.markets].sort(
		(a, b) => b.volumeNum - a.volumeNum,
	);

	const markdown = `# ${event.title}

## Event Overview
- **Event ID**: ${event.id}
- **Status**: ${event.active ? "🟢 Active" : "🔴 Closed"}
- **Ticker**: ${event.ticker}
- **Created**: ${formatDate(event.createdAt)}
- **End Date**: ${formatDate(event.endDate)}
- **Tags**: ${event.tags.map((tag) => tag.label).join(", ")}

## Description
${event.description}

## Event Statistics
- **Total Volume**: $${formatNumber(event.volume)}
- **Total Liquidity**: $${formatNumber(event.liquidity)}
- **24h Volume**: $${formatNumber(event.volume24hr)}
- **7d Volume**: $${formatNumber(event.volume1wk)}
- **30d Volume**: $${formatNumber(event.volume1mo)}
- **Markets Count**: ${event.markets.length}
- **Comments**: ${event.commentCount}

## Markets

| # | Question | Outcomes & Odds | Token IDs | Last Trade | Volume | 24h Volume | Liquidity | Spread | Market ID |
|---|----------|-----------------|-----------|------------|--------|------------|-----------|--------|-----------|
${sortedMarkets
	.map((market, index) => {
		const outcomes = JSON.parse(market.outcomes ?? "[]") as string[];
		const prices = JSON.parse(market.outcomePrices ?? "[]") as string[];
		const tokenIds = parseClobTokenIds(market.clobTokenIds);

		const outcomesText = outcomes
			.map(
				(outcome, i) =>
					`${outcome}: ${formatPercentage(Number.parseFloat(prices[i]))}`,
			)
			.join("<br>");

		const tokenIdsText = `Yes: ${tokenIds.yes || "N/A"}<br>No: ${tokenIds.no || "N/A"}`;

		return `| ${index + 1} | ${market.question} | ${outcomesText} | ${tokenIdsText} | ${formatPercentage(market.lastTradePrice)} | $${formatNumber(market.volumeNum)} | $${formatNumber(market.volume24hr)} | $${formatNumber(market.liquidityNum)} | ${formatPercentage(market.spread)} | ${market.id} |`;
	})
	.join("\n")}

## Event Details
- **Resolution Source**: ${event.resolutionSource || "Not specified"}
- **Order Book Enabled**: ${event.enableOrderBook ? "Yes" : "No"}
- **Neg Risk**: ${event.negRisk ? "Yes" : "No"}
- **Competitive Score**: ${(event.competitive * 100).toFixed(1)}%
- **Restricted**: ${event.restricted ? "Yes" : "No"}

## Links
- **Polymarket URL**: https://polymarket.com/event/${event.slug}
- **Event Image**: ${event.image}`;

	c.header("Content-Type", "text/markdown");
	return c.text(markdown);
});

polymarket.get("/market_price_history", async (c) => {
	const { market, interval = "all", fidelity = "720", theme = "dark" } = c.req.query();

	if (!market) {
		return c.json({ error: "Market ID is required" }, 400);
	}

	// Set theme colors
	const bgColor = theme === 'dark' ? '#151518' : '#FFFFFF';
	const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
	const gridColor = theme === 'dark' ? '#444444' : '#E0E0E0';
	const lineColors = theme === 'dark' 
		? ['#00D4FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'] 
		: ['#007BFF', '#DC3545', '#28A745', '#FFC107', '#6F42C1', '#FD7E14'];

	const marketIds = market.split(",");

	const marketDataPromises = marketIds.map(async (marketId) => {
		const priceHistoryResponse = await fetch(
			`https://clob.polymarket.com/prices-history?interval=${interval}&market=${marketId}&fidelity=${fidelity}`,
		);

		if (!priceHistoryResponse.ok) {
			throw new Error(`Failed to fetch price history for market ${marketId}`);
		}

		const priceHistory = await priceHistoryResponse.json() as PriceHistoryResponse;

		return {
			marketId,
			priceHistory,
		};
	});

	try {
		const marketDataResults = await Promise.all(marketDataPromises);

		const traces = marketDataResults.map((data, index) => {
			return {
				x: data.priceHistory.history.map((point) => new Date(point.t * 1000).toISOString()),
				y: data.priceHistory.history.map((point) => point.p * 100),
				type: "scatter",
				mode: "lines",
				name: `Market ${data.marketId}`,
				line: {
					width: 2,
					color: lineColors[index % lineColors.length],
				},
			};
		});

		const plotlyData = {
			data: traces,
			layout: {
				plot_bgcolor: bgColor,
				paper_bgcolor: bgColor,
				font: {
					color: textColor,
				},
				xaxis: {
					title: "Date",
					type: "date",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				yaxis: {
					title: "Price (%)",
					range: [0, 100],
					ticksuffix: "%",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				margin: {
					l: 60,
					r: 30,
					t: 50,
					b: 50,
				},
				hovermode: "x unified",
				showlegend: false,
			},
		};

		return c.json(plotlyData);
	} catch (error) {
		return c.json(
			{ error: "Failed to fetch price history for one or more markets" },
			500,
		);
	}
});

polymarket.get("/event_markets", async (c) => {
	const { id } = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	const response = await fetch(`https://gamma-api.polymarket.com/events/${id}`);

	if (!response.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await response.json()) as DetailedEvent;

	const sortedMarkets = [...event.markets].sort(
		(a, b) => b.volumeNum - a.volumeNum,
	);

	return c.json(
		sortedMarkets.map((market) => {
			const outcomes = JSON.parse(market.outcomes ?? "[]") as string[];
			const prices = JSON.parse(market.outcomePrices ?? "[]") as string[];
			const tokenIds = parseClobTokenIds(market.clobTokenIds);

			const outcomeData: Record<string, number> = {};
			outcomes.forEach((outcome, index) => {
				const key = outcome.toLowerCase().replace(/\s+/g, '_');
				outcomeData[key] = Number.parseFloat(prices[index] || "0");
			});

			return {
				id: market.id,
				question: market.question,
				slug: market.slug,
				active: market.active,
				outcomes,
				...outcomeData,
				tokenIds,
				lastTradePrice: market.lastTradePrice,
				bestBid: market.bestBid,
				bestAsk: market.bestAsk,
				spread: market.spread,
				volume: market.volumeNum,
				liquidity: market.liquidityNum,
				volume24hr: market.volume24hr,
				volume1wk: market.volume1wk,
				volume1mo: market.volume1mo,
				volume1yr: market.volume1yr,
				oneDayPriceChange: market.oneDayPriceChange,
				oneWeekPriceChange: market.oneWeekPriceChange,
				oneMonthPriceChange: market.oneMonthPriceChange,
				endDate: market.endDate,
				createdAt: market.createdAt,
				description: market.description,
				resolutionSource: market.resolutionSource,
				acceptingOrders: market.acceptingOrders,
				orderMinSize: market.orderMinSize,
				groupItemTitle: market.groupItemTitle,
			};
		}),
	);
});

polymarket.get("/trending_tags", async (c) => {
	const response = await fetch(
		"https://polymarket.com/api/tags/filteredBySlug?tag=all&status=active",
	);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch trending tags" }, 500);
	}

	const data = (await response.json()) as TrendingTag[];

	// Sort by createdAt from most recent to least recent
	const sortedData = data.sort((a, b) => {
		const dateA = new Date(a.createdAt).getTime();
		const dateB = new Date(b.createdAt).getTime();
		return dateB - dateA; // Most recent first
	});

	return c.json(
		sortedData.map((tag) => ({
			id: tag.id,
			label: tag.label,
			slug: tag.slug,
			createdAt: formatDate(tag.createdAt),
		})),
	);
});

polymarket.get("/event_price_history", async (c) => {
	const { id, interval = "all", fidelity = "720", theme = "dark" } = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	// Set theme colors
	const bgColor = theme === 'dark' ? '#151518' : '#FFFFFF';
	const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
	const gridColor = theme === 'dark' ? '#444444' : '#E0E0E0';
	const lineColors = theme === 'dark' 
		? ['#00D4FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F0E68C', '#FFA07A', '#98FB98'] 
		: ['#007BFF', '#DC3545', '#28A745', '#FFC107', '#6F42C1', '#FD7E14', '#E83E8C', '#20C997', '#6610F2', '#17A2B8'];

	const eventResponse = await fetch(`https://gamma-api.polymarket.com/events/${id}`);

	if (!eventResponse.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await eventResponse.json()) as DetailedEvent;

	const marketDataPromises = event.markets.map(async (market) => {
		const tokenIds = parseClobTokenIds(market.clobTokenIds);
		
		const yesTokenId = tokenIds.yes;
		
		if (!yesTokenId) {
			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory: { history: [] },
			};
		}

		try {
			const priceHistoryResponse = await fetch(
				`https://clob.polymarket.com/prices-history?interval=${interval}&market=${yesTokenId}&fidelity=${fidelity}`,
			);

			if (!priceHistoryResponse.ok) {
				return {
					marketId: market.id,
					marketName: market.question,
					priceHistory: { history: [] },
				};
			}

			const priceHistory = await priceHistoryResponse.json() as PriceHistoryResponse;

			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory,
			};
		} catch (error) {
			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory: { history: [] },
			};
		}
	});

	try {
		const marketDataResults = await Promise.all(marketDataPromises);

		const traces = marketDataResults
			.filter((data) => data.priceHistory.history.length > 0)
			.map((data, index) => {
				const yValues = data.priceHistory.history.map((point) => point.p * 100);
				const latestPrice = yValues[yValues.length - 1] || 0;
				
				return {
					x: data.priceHistory.history.map((point) => new Date(point.t * 1000).toISOString()),
					y: yValues,
					type: "scatter",
					mode: "lines",
					name: data.marketName,
					line: {
						width: 2,
						color: lineColors[index % lineColors.length],
					},
					latestPrice,
				};
			})
			.sort((a, b) => b.latestPrice - a.latestPrice);

		const plotlyData = {
			data: traces,
			layout: {
				title: {
					text: `${event.title} - Market Price History (Yes Outcomes)`,
					font: { color: textColor },
				},
				plot_bgcolor: bgColor,
				paper_bgcolor: bgColor,
				font: {
					color: textColor,
				},
				xaxis: {
					title: "Date",
					type: "date",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				yaxis: {
					title: "Price (%)",
					range: [0, 100],
					ticksuffix: "%",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				margin: {
					l: 60,
					r: 30,
					t: 80,
					b: 50,
				},
				hovermode: "x unified",
				showlegend: true,
				legend: {
					font: { color: textColor },
					bgcolor: 'rgba(0,0,0,0)',
				},
			},
		};

		return c.json(plotlyData);
	} catch (error) {
		return c.json(
			{ error: "Failed to fetch price history for event markets" },
			500,
		);
	}
});

polymarket.get("/home_cards", async (c) => {
	const { limit = "20", offset = "0", tag } = c.req.query();

	let url = `https://gamma-api.polymarket.com/events/pagination?limit=${limit}&active=true&archived=false&closed=false&order=volume24hr&ascending=false&offset=${offset}`;
	
	if (tag && tag.trim() !== "") {
		url += `&tag_slug=${tag}`;
	}

	const response = await fetch(url);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch home cards" }, 500);
	}

	const data = (await response.json()) as {
		data: (Event & {
			volume: number;
			liquidity: number;
			volume24hr: number;
			volume1w: number;
			volume1mo: number;
			volume1yr: number;
		})[];
		count: number;
		next_cursor: string | null;
	};

	return c.json(
		data.data.map((event) => ({
			id: event.id,
			title: event.title,
			slug: event.slug,
			active: !event.closed,
			markets: event.markets
				.map(
					(market) =>
						`${market.slug}: ${Array.isArray(market.outcomes) ? market.outcomes.map((outcome, i) => `${outcome}(${market.outcomePrices[i]})`).join("/") : ""}`,
				)
				.join("\n"),
			volume: event.volume,
			liquidity: event.liquidity,
			volume24hr: event.volume24hr,
			volume1w: event.volume1w,
			volume1mo: event.volume1mo,
			volume1yr: event.volume1yr,
			startDate: event.startDate,
			endDate: event.endDate,
			url: event.url,
		})),
	);
});

polymarket.get("/market_gauge", async (c) => {
	const { market_slug } = c.req.query();

	if (!market_slug) {
		return c.json({ error: "Market slug is required" }, 400);
	}

	// First, fetch the market by slug
	const response = await fetch(
		`https://gamma-api.polymarket.com/markets?slug=${market_slug}`,
	);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch market" }, 500);
	}

	const markets = (await response.json()) as DetailedMarket[];
	
	if (!markets || markets.length === 0) {
		return c.json({ error: "Market not found" }, 404);
	}
	
	const market = markets[0];
	
	const outcomes = JSON.parse(market.outcomes) as string[];
	const prices = JSON.parse(market.outcomePrices) as string[];
	
	// For binary markets (Yes/No), use the Yes price for the gauge
	const yesPrice = prices[0] ? Number.parseFloat(prices[0]) * 100 : 50;
	
	// Calculate rotation angle for the needle (0% = -90deg, 100% = 90deg)
	const needleRotation = -90 + (yesPrice * 1.8);
	
	// Generate pure HTML/CSS gauge without JavaScript
	const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #151518;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        
        .market-title {
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 30px;
            padding: 0 20px;
            line-height: 1.4;
        }
        
        .gauge-container {
            position: relative;
            width: 300px;
            height: 150px;
            margin: 0 auto;
        }
        
        .gauge-background {
            position: absolute;
            width: 300px;
            height: 150px;
            border-radius: 150px 150px 0 0;
            background: linear-gradient(to right, #ef4444 0%, #ef4444 ${100 - yesPrice}%, #10b981 ${100 - yesPrice}%, #10b981 100%);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
        }
        
        .gauge-center {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 240px;
            height: 120px;
            border-radius: 120px 120px 0 0;
            background: #151518;
        }
        
        .gauge-needle {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 4px;
            height: 130px;
            background: linear-gradient(to top, #fff 0%, #fff 95%, transparent 95%);
            transform-origin: bottom center;
            transform: translateX(-50%) rotate(${needleRotation}deg);
            z-index: 10;
        }
        
        .gauge-needle::after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 15px solid #fff;
        }
        
        .gauge-center-dot {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #374151;
            z-index: 11;
        }
        
        .gauge-labels {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .gauge-label {
            position: absolute;
            font-size: 12px;
            font-weight: 600;
            color: #9ca3af;
        }
        
        .label-no {
            bottom: -5px;
            left: 10px;
        }
        
        .label-50 {
            bottom: 125px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .label-yes {
            bottom: -5px;
            right: 10px;
        }
        
        .value-display {
            font-size: 48px;
            font-weight: 700;
            text-align: center;
            margin: 30px 0 20px;
        }
        
        .outcomes-info {
            display: flex;
            justify-content: center;
            gap: 40px;
            font-size: 14px;
        }
        
        .outcome {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .indicator {
            width: 14px;
            height: 14px;
            border-radius: 3px;
        }
        
        .yes-indicator {
            background: #10b981;
        }
        
        .no-indicator {
            background: #ef4444;
        }
        
        .outcome-label {
            color: #9ca3af;
        }
        
        .price-value {
            font-weight: 700;
            color: #fff;
            margin-left: 4px;
        }
        
        /* Add tick marks */
        .tick-marks {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .tick {
            position: absolute;
            width: 2px;
            height: 10px;
            background: #fff;
            bottom: 0;
            left: 50%;
            transform-origin: bottom center;
        }
        
        .tick-0 { transform: translateX(-50%) rotate(-90deg) translateY(-140px); }
        .tick-10 { transform: translateX(-50%) rotate(-72deg) translateY(-140px); }
        .tick-20 { transform: translateX(-50%) rotate(-54deg) translateY(-140px); }
        .tick-30 { transform: translateX(-50%) rotate(-36deg) translateY(-140px); }
        .tick-40 { transform: translateX(-50%) rotate(-18deg) translateY(-140px); }
        .tick-50 { transform: translateX(-50%) rotate(0deg) translateY(-140px); }
        .tick-60 { transform: translateX(-50%) rotate(18deg) translateY(-140px); }
        .tick-70 { transform: translateX(-50%) rotate(36deg) translateY(-140px); }
        .tick-80 { transform: translateX(-50%) rotate(54deg) translateY(-140px); }
        .tick-90 { transform: translateX(-50%) rotate(72deg) translateY(-140px); }
        .tick-100 { transform: translateX(-50%) rotate(90deg) translateY(-140px); }
    </style>
</head>
<body>
    <div class="market-title">${market.question}</div>
    
    <div class="gauge-container">
        <div class="gauge-background"></div>
        <div class="gauge-center"></div>
        
        <div class="tick-marks">
            <div class="tick tick-0"></div>
            <div class="tick tick-10"></div>
            <div class="tick tick-20"></div>
            <div class="tick tick-30"></div>
            <div class="tick tick-40"></div>
            <div class="tick tick-50"></div>
            <div class="tick tick-60"></div>
            <div class="tick tick-70"></div>
            <div class="tick tick-80"></div>
            <div class="tick tick-90"></div>
            <div class="tick tick-100"></div>
        </div>
        
        <div class="gauge-needle"></div>
        <div class="gauge-center-dot"></div>
        
        <div class="gauge-labels">
            <div class="gauge-label label-no">NO</div>
            <div class="gauge-label label-50">50</div>
            <div class="gauge-label label-yes">YES</div>
        </div>
    </div>
    
    <div class="value-display">${yesPrice.toFixed(1)}%</div>
    
    <div class="outcomes-info">
        <div class="outcome">
            <div class="indicator yes-indicator"></div>
            <span class="outcome-label">Yes:<span class="price-value">${yesPrice.toFixed(1)}%</span></span>
        </div>
        <div class="outcome">
            <div class="indicator no-indicator"></div>
            <span class="outcome-label">No:<span class="price-value">${(100 - yesPrice).toFixed(1)}%</span></span>
        </div>
    </div>
</body>
</html>
	`;

	c.header("Content-Type", "text/html");
	return c.text(html);
});

polymarket.get("/event_comments", async (c) => {
	const { 
		id, 
		limit = "40", 
		offset = "0", 
		holders_only = "false", 
		order = "createdAt" 
	} = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	const url = `https://gamma-api.polymarket.com/comments?get_positions=true&get_reports=true&parent_entity_type=Event&parent_entity_id=${id}&ascending=false&holders_only=${holders_only}&order=${order}&limit=${limit}&offset=${offset}`;

	const response = await fetch(url);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch event comments" }, 500);
	}

	const comments = (await response.json()) as Comment[];

	return c.json(
		comments.map((comment) => ({
			body: comment.body,
			authorName: comment.profile.name || comment.profile.pseudonym,
			authorPseudonym: comment.profile.pseudonym,
			authorAddress: comment.userAddress,
			authorBio: comment.profile.bio,
			createdAt: formatDate(comment.createdAt),
			reactionCount: comment.reactionCount,
			reportCount: comment.reportCount,
			reactions: comment.reactions?.map((reaction) => ({
				type: reaction.reactionType,
				userAddress: reaction.userAddress,
			})) || [],
			positions: comment.profile.positions?.map((position) => ({
				tokenId: position.tokenId,
				positionSize: formatNumber(Number.parseFloat(position.positionSize) / 1e6),
			})) || [],
			hasPositions: (comment.profile.positions?.length || 0) > 0,
		})),
	);
});

export default polymarket;

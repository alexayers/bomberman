import {GameMap} from "../gameMap";
import {PathNode} from "./pathNode";
import {GameEntity} from "../entity/gameEntity";


export class AStar {

    private _gameMap: GameMap = GameMap.getInstance();
    private _closedSet: Map<number, PathNode> = new Map<number, PathNode>();
    private _openSet: Map<number, PathNode> = new Map<number, PathNode>();
    private _path: Array<PathNode> = new Array<PathNode>();
    private _currentNode: PathNode = new PathNode(0, 0);

    private _startX: number;
    private _startY: number;
    private _endX: number;
    private _endY: number;


    public constructor(startX: number, startY: number, endX: number, endY: number) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;

        let idx: number = this._gameMap.translateCoordinatesToIdx(startX, startY);

        let n: PathNode = new PathNode(startX, startY);
        n.setIdx(idx);
        n.setParent(0);
        n.setG(0);
        n.setH(this.getManhattanDistance(n.getX(), n.getY()));
        n.setF(n.getG() + n.getH());

        this._openSet.set(idx, n);
    }

    private getManhattanDistance(x: number, y: number): number {
        return ((Math.abs(x - this._endX) + Math.abs(y - this._endY)) * 10);
    }

    private isOnClosedList(idx: number): boolean {

        // @ts-ignore
        for (let [k,pathNode] of this._closedSet) {
            if (pathNode.getIdx() == idx) {
                return true;
            }
        }

        return false;
    }

    private isOnOpenedList(idx: number): boolean {
        // Iterator<Map.Entry<Integer, Node>> it = openSet.entrySet().iterator();

        // @ts-ignore
        for (let [k,pathNode] of this._openSet) {
            if (pathNode.getIdx() == idx) {
                return true;
            }
        }

        return false;
    }

    private addToOpenedList(n: PathNode): void {
        this._openSet.set(n.getIdx(), n);
    }

    private addToClosedList(idx: number, n: PathNode): void {
        this._closedSet.set(idx, n);
    }

    private findLowestCost(): PathNode {
        let f: number = 99999;
        let lowestCostIdx: number = 0;

        //Iterator<Map.Entry<Integer, Node>> it = openSet.entrySet().iterator();

        // @ts-ignore
        for (let [k,pathNode] of this._openSet) {

            if (pathNode.getF() <= f) {
                f = pathNode.getF();
                lowestCostIdx = pathNode.getIdx();
            }
        }

        let lowestNode: PathNode = this._openSet.get(lowestCostIdx);
        this._openSet.delete(lowestCostIdx);
        return lowestNode;
    }

    private calculateGValue(x: number, y: number): number {
        // Checking behind me
        if (x == (this._currentNode.getX() - 1) && y == this._currentNode.getY()) {
            let gameEntity : GameEntity = GameMap.getInstance().getGameEntity("item", this._currentNode.getX() - 1, this._currentNode.getY());
            return this.getTileWeight(gameEntity);

            // Checking in front of me
        } else if (x == (this._currentNode.getX() + 1) && y == this._currentNode.getY()) {
            let gameEntity : GameEntity = GameMap.getInstance().getGameEntity("item", this._currentNode.getX() + 1, this._currentNode.getY());
            return this.getTileWeight(gameEntity);
            // Checking above me
        } else if (x == (this._currentNode.getX()) && y == this._currentNode.getY() + 1) {
            let gameEntity : GameEntity = GameMap.getInstance().getGameEntity("item", this._currentNode.getX(), this._currentNode.getY() + 1);
            return this.getTileWeight(gameEntity);
            // Checking below me
        } else if (x == (this._currentNode.getX()) && y == this._currentNode.getY() - 1) {
            let gameEntity : GameEntity = GameMap.getInstance().getGameEntity("item", this._currentNode.getX(), this._currentNode.getY() -1 );
            return this.getTileWeight(gameEntity);
            // Checking diagonal
        } else {
            return 1400;
        }
    }

    private getTileWeight(gameEntity : GameEntity) : number {

        if (gameEntity == null) {
            return 10;
        }

        if (gameEntity.hasComponent("destructible")) {
            if (gameEntity.getName() == "crate") {
                return 5;
            } else if (gameEntity.getName() == "bomb") {
                return 100000;
            } else {
                return 15;
            }
        } else {
            return 10;
        }
    }

    private buildNodeList(): void {

        for (let y = (this._currentNode.getY() + 1); y >= (this._currentNode.getY() - 1); y--) {
            for (let x = (this._currentNode.getX() - 1); x < (this._currentNode.getX() + 2); x++) {

                if (x == this._currentNode.getX() && y == this._currentNode.getY()) {
                    continue;
                } else {
                    if (y >= 0 &&
                        x >= 0 &&
                        x < (this._gameMap.getWidth() - 1) &&
                        y < (this._gameMap.getHeight() - 1) &&
                        !GameMap.getInstance().canDestroy(x, y)) {
                        let cost: number = this._currentNode.getG() + this.calculateGValue(x, y);
                        let idx: number = GameMap.getInstance().translateCoordinatesToIdx(x, y);

                        if (this.isOnOpenedList(idx) && cost < this._openSet.get(idx).getG()) {
                            this._openSet.get(idx).setG(cost);
                            this._openSet.get(idx).setF(this._openSet.get(idx).getG() + this._openSet.get(idx).getH());
                            this._openSet.get(idx).setParent(this._currentNode.getIdx());
                        } else if (this.isOnClosedList(idx)) {
                            continue;
                        } else if (!this.isOnOpenedList(idx)) {
                            let n: PathNode = new PathNode(0, 0);
                            n.setG(cost);
                            n.setX(x);
                            n.setY(y);
                            n.setH(this.getManhattanDistance(x, y));
                            n.setIdx(idx);
                            n.setParent(this._currentNode.getIdx());
                            n.setF(n.getG() + n.getH());
                            this.addToOpenedList(n);
                        }
                    }
                }
            }
        }
    }

    private buildRoute(): void {
        let startIdx: number = GameMap.getInstance().translateCoordinatesToIdx(this._startX, this._startY);
        let idx: number = GameMap.getInstance().translateCoordinatesToIdx(this._endX, this._endY);

        while (idx != startIdx) {
            this._path.push(this._closedSet.get(idx));
            idx = this._closedSet.get(idx).getParent();
        }
    }

    public getPath(): Array<PathNode> {
        return this._path;
    }

    public isPathFound(): boolean {
        let pathFound: boolean = false;

        while (this._openSet.size != 0) {
            this._currentNode = this.findLowestCost();
            this.addToClosedList(this._currentNode.getIdx(), this._currentNode);

            if (this._currentNode.getIdx() == GameMap.getInstance().translateCoordinatesToIdx(this._endX, this._endY)) {
                this.buildRoute();

                pathFound = true;
                break;
            } else {
                this.buildNodeList();
            }


        }

        return pathFound;
    }


}
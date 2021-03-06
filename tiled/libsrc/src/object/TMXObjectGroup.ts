module tiled {
	export class TMXObjectGroup extends egret.Sprite {
		private _name: string;
		private _z: number;
		private _objects: Array<tiled.TMXObject>;
		private _objectHash: any;
		private _opacity: number;
		private _draworder: string;
		private _color: number;
		private _orientaion: string;
		private _childrens: Array<any>;
		private _tilesets: tiled.TMXTilesetGroup;
		type: string;

		/**
		 * 创建1个对象组
		 * @param data 数据
		 * @param orientation 渲染方向
		 * @param tilesets TMXTilset实例
		 * @param z 对象组所在的层
		 * @version Egret 3.0.3
		 */
		constructor(data: any, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number) {
			super();

			this._name = data.attributes.name;
			this._opacity = (typeof data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
			this._draworder = data.attributes.draworder;
			this._color = data.attributes.color ? (tiled.TMXUtils.color16ToUnit(data.attributes.color)) : tiled.TMXConstants.DEFAULT_COLOR;
			this._orientaion = orientation;
			this._tilesets = tilesets;
			this._z = z;
			this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
			this._objects = [];
			this._objectHash = {};
			this._childrens = data.children;
		}

		/**
		 * 对象组名称
		 * @version Egret 3.0.3
		 */
		get name() {
			return this._name;
		}

		draw() {
			if (this._childrens) {
				for (var i: number = 0; i < this._childrens.length; i++) {
					var object: tiled.TMXObject = new tiled.TMXObject(this._childrens[i], this._orientaion, this._tilesets, this._z, this._color);
					object.alpha = this._opacity;
					this._objects[i] = object;
					this.addZChild(object);
					this._objectHash[object.id] = object;
				}
				this._objects[i]
			}
		}

		/**
		 * 排序(z序)插入
		 */
		public addZChild(s: egret.Sprite) {
			let my_z: number = (s.y + s.height) * this._tilesets.tilemap.tilewidth * this._tilesets.tilemap.cols + s.x + s.width;

			if (this.numChildren > 0) {
				for (var a = 0; a < this.numChildren; a++) {
					let val: egret.DisplayObject = this.getChildAt(a);
					if (val != s) {
						let z: number = (val.y + val.height) * this._tilesets.tilemap.tilewidth * this._tilesets.tilemap.cols + val.x + val.width;
						if (my_z < z) {
							if (a > 0) {
								this.addChildAt(s, a - 1);
							} else {
								this.addChildAt(s, 0);
							}
							return;
						}
					} else if ((a+1)>=this.numChildren) {
						return;
					}
				}
				this.addChildAt(s, this.numChildren);
			} else {
				this.addChild(s);
			}
		}

		/**
		 * 渲染
		 * @version Egret 3.0.3
		 */
		render(): void {

		}

		/**
		 * 销毁
		 * @version Egret 3.0.3
		 */
		destory(): void {
			this._objects = null;
		}

		/**
		 * 根据对象id获取TMXObject实例
		 * @param id 对象id，在tmx数据中是由tiled工具生成的
		 * @version Egret 3.0.3
		 */
		getObjectById(id: number): tiled.TMXObject {
			return this._objectHash[id];
		}

		/**
		 * 根据对象id移除TMXObject实例
		 * @param id 对象id，在tmx数据中是由tiled工具生成的
		 * @version Egret 3.0.3
		 */
		removeObjectById(id: number): void {
			var object: tiled.TMXObject = this.getObjectById(id);
			if (object && object.parent)
				object.parent.removeChild(object);
		}

		/**
		 * 根据对象id显示或者隐藏对象
		 * @param id 对象id，在tmx数据中是由tiled工具生成的
		 * @param visible 是否显示
		 * @version Egret 3.0.3
		 */
		showHideObjectById(id: number, visible: boolean): void {
			var object: tiled.TMXObject = this.getObjectById(id);
			if (object)
				object.visible = true;
		}

		/**
		 * 获取对象组中对象长度
		 * @version Egret 3.0.3
		 */
		getObjectCount(): number {
			return this._objects.length;
		}

		/**
		 * 根据索引获取TMXObject实例
		 * @param index 对象所在对象组中的索引
		 * @version Egret 3.0.3
		 */
		getObjectByIndex(index: number): tiled.TMXObject {
			return this._objects[index];
		}


		/**
		 * 根据索引移除对象
		 * @param index  对象所在对象组中的索引
		 * @version Egret 3.0.3
		 */
		removeObjectByIndex(index: number): void {
			var object: tiled.TMXObject = this.getObjectByIndex(index);
			if (object && object.parent)
				object.parent.removeChild(object);
		}
	}
}

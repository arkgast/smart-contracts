import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import type { SimpleStorage } from "../typechain-types/SimpleStorage";

async function simpleStorageFixture() {
  const [owner, otherAccount] = await ethers.getSigners();
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await simpleStorageFactory.deploy();
  return { simpleStorage, owner, otherAccount };
}

describe("SimpleContract", () => {
  let simpleStorage: SimpleStorage;
  let owner: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  beforeEach(async () => {
    ({ simpleStorage, owner, otherAccount } = await loadFixture(
      simpleStorageFixture
    ));
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await simpleStorage.owner()).to.equal(owner.address);
    });

    it("should have an empty message", async () => {
      expect(await simpleStorage.getMessage()).to.equal("");
    });
  });

  describe("#setMessage", () => {
    describe("failure", () => {
      it("should reject if caller is not the owner", async () => {
        await expect(
          simpleStorage.connect(otherAccount).setMessage("Hello world!")
        ).to.rejectedWith("Only the owner can call this function.");
      });

      it("should reject if message is empty", async () => {
        await expect(simpleStorage.setMessage("")).to.be.rejectedWith(
          "Message cannot be empty."
        );
      });
    });

    describe("success", async () => {
      it("should set a new message", async () => {
        const message = "Hello world!";
        await simpleStorage.setMessage(message);
        expect(await simpleStorage.getMessage()).to.equal(message);
      });

      it("should emit MessageChanged event", async () => {
        const message = "Hello world!";
        await expect(simpleStorage.setMessage(message))
          .to.emit(simpleStorage, "MessageChanged")
          .withArgs(message);
      });
    });
  });
});
